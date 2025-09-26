from typing import Optional
from datetime import datetime
import uuid
from fastapi import HTTPException
from app.models.lettre_model import LettreCreate, LettreInDB, LettreUpdate
from app.models.statut_model import StatutBase  
from app.db.mongo import mongo
from app.services.lettre_generator import generate_letter_with_langchain
from app.utils.helpers import generate_unique_code
from typing import List
from bson import ObjectId  # make sure to import this
from fastapi import UploadFile
from app.services.speech_to_text_service import transcribe_audio_file


class LettreViewModel:
    # def __init__(self):
    #     self.collection = db["lettres"]
    @property
    def collection(self):
        if mongo.db is None:
            raise HTTPException(status_code=500, detail="Database not initialized")
        return mongo.db["lettres"]
    async def create_lettre(self, lettre: LettreCreate) -> LettreInDB:
        code_unique = generate_unique_code(lettre.idClient, str(uuid.uuid4()))
        lettre_data = lettre.model_dump()
        lettre_data["code_unique"] = code_unique
        lettre_data["statut"] = "Commande déclarée"
        lettre_data["created_at"] = datetime.utcnow()

        result = await self.collection.insert_one(lettre_data)
        inserted_id = str(result.inserted_id)
        lettre_data["id"] = inserted_id

        return LettreInDB(**lettre_data)

    # async def get_lettre_by_id(self, lettre_id: str) -> Optional[LettreInDB]:
    #     data = await self.collection.find_one({"id": lettre_id})
    #     if not data:
    #         return None
    #     return LettreInDB(**data)
    async def get_lettre_by_id(self, lettre_id: str) -> Optional[LettreInDB]:
        try:
            obj_id = ObjectId(lettre_id)
        except Exception:
            raise HTTPException(status_code=400, detail="ID invalide")

        data = await self.collection.find_one({"_id": obj_id})
        if not data:
            return None

        # Re-add the string id field so LettreInDB can parse it
        data["id"] = str(data["_id"])
        return LettreInDB(**data)

    async def update_statut(self, lettre_id: str, update_data: LettreUpdate) -> LettreInDB:
        lettre = await self.get_lettre_by_id(lettre_id)
        if not lettre:
            raise HTTPException(status_code=404, detail="Lettre non trouvée")

        statut_actuel = lettre.statut
        new_statut = update_data.statut

        # If no new statut provided, do nothing
        if not new_statut or new_statut == statut_actuel:
            raise HTTPException(status_code=400, detail="Aucun changement de statut détecté")

        # Ensure destinataire_cin is provided for 'Livré'
        if new_statut == "Livré" and not update_data.destinataire_cin:
            raise HTTPException(
                status_code=400,
                detail="Le CIN du destinataire est requis pour marquer la lettre comme 'Livré'"
            )

        # Define fixed descriptions for each status
        descriptions = {
            "Commande déclarée": "Commande enregistrée et en préparation",
            "Arrivé à destination": "Lettre arrivée au point de distribution",
            "Livré": "Lettre remise au destinataire"
        }

        update_fields = {
            "updated_at": datetime.utcnow(),
            "statut": new_statut
        }

        if update_data.destinataire_cin:
            update_fields["destinataire_cin"] = update_data.destinataire_cin

        # Update lettre document
        await self.collection.update_one(
            {"id": lettre_id},
            {"$set": update_fields}
        )

        # Add new entry to Statut collection
        from app.viewmodels.statut_vm import StatutViewModel
        statut_vm = StatutViewModel()

        await statut_vm.add_statut(StatutBase(
            lettre_id=lettre_id,
            statut=new_statut,
            description=descriptions.get(new_statut, "Mise à jour du statut"),
            destinataire_cin=update_data.destinataire_cin
        ))

        return await self.get_lettre_by_id(lettre_id)


    # async def generate_letter_from_prompt(self, prompt: str, tone: str) -> str:
    #     return generate_letter_with_langchain(prompt, tone)
    async def generate_letter_from_prompt(self, prompt: str, tone: str, length: str ) -> str:
        return generate_letter_with_langchain(prompt=prompt, tone=tone, length=length)

    async def get_lettres_by_client(self, client_id: str) -> List[LettreInDB]:
        lettres = []
        cursor = self.collection.find({"idClient": client_id})
        async for lettre in cursor:
            lettres.append(LettreInDB(**lettre))
        return lettres
    


    
    async def transcribe(self, file: UploadFile) -> str:
        return await transcribe_audio_file(file)



    # async def update_statut(self, lettre_id: str, update_data: LettreUpdate) -> LettreInDB:
    #     lettre = await self.get_lettre_by_id(lettre_id)
    #     if not lettre:
    #         raise HTTPException(status_code=404, detail="Lettre non trouvée")

    #     statut_actuel = lettre.statut
    #     new_statut = update_data.statut or statut_actuel

    #     update_fields = {"updated_at": datetime.utcnow(), "statut": new_statut}

    #     if update_data.destinataire_cin:
    #         update_fields["destinataire_cin"] = update_data.destinataire_cin

    #     await self.collection.update_one(
    #         {"id": lettre_id},
    #         {"$set": update_fields}
    #     )

    #     updated = await self.get_lettre_by_id(lettre_id)
    #     return updated

