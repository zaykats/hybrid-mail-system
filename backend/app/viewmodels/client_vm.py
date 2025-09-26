from typing import Optional
from datetime import datetime
from fastapi import HTTPException, status
from app.models.client_model import ClientCreate, ClientInDB, ClientUpdate
from app.db.mongo import mongo
from app.core.hashing import hash_password
from app.utils.helpers import generate_client_id
from typing import List
from app.core.hashing import verify_password


class ClientViewModel:
    @property
    def collection(self):
        if mongo.db is None:
         raise HTTPException(status_code=500, detail="Database not initialized")
        return mongo.db["clients"]

    async def create_client(self, client: ClientCreate) -> ClientInDB:
        # Vérifier les doublons CIN, téléphone, email
        existing = await self.collection.find_one({
            "$or": [
                {"identifiantclient": client.identifiantclient},
                {"telephone": client.telephone},
                {"email": client.email}
            ]
        })

        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Client déjà existant avec ce CIN, téléphone ou email"
            )

        hashed_pwd = hash_password(client.password)
        client_data = client.model_dump()
        client_data["password"] = hashed_pwd
        client_data["id"] = generate_client_id()  # ex: "CLI20250405123456"
        client_data["created_at"] = datetime.utcnow()
 
        await self.collection.insert_one(client_data)
        
        return ClientInDB(**client_data)

    async def get_client_by_id(self, client_id: str) -> Optional[ClientInDB]:
        data = await self.collection.find_one({"id": client_id})
        if not data:
            return None
        return ClientInDB(**data)

    async def update_client(self, client_id: str, update_data: ClientUpdate) -> ClientInDB:
        update_data_dict = update_data.model_dump(exclude_unset=True)
        result = await self.collection.update_one(
            {"id": client_id},
            {"$set": {**update_data_dict, "updated_at": datetime.utcnow()}}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Client non trouvé")
        updated = await self.get_client_by_id(client_id)
        return updated
    
    async def get_all_clients(self) -> List[ClientInDB]:
        clients_cursor = self.collection.find({}, {'_id': 0})  # Exclure _id
        clients = []
        async for client in clients_cursor:
            clients.append(ClientInDB(**client))
        return clients
    

    # async def get_client_by_email(self, email: str) -> Optional[ClientInDB]:
    #     client = await self.collection.find_one({"email": email})
    #     print("Client trouvé:", client)
    #     if not client:
    #         return None
    #     if "password" not in client:
    #         raise HTTPException(status_code=500, detail="Le mot de passe est manquant dans la base de données.")
    #     return ClientInDB(**client)


    async def authenticate_clientvm(self, email: str, password: str) -> ClientInDB:
            """
            Authentifie un client via email et mot de passe.
            Lève une exception HTTP si l’un des deux est incorrect.
            """
            client = await self.collection.find_one({"email": email}, {"_id": 0})
            if not client:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Identifiants incorrects"
                )

            if "password" not in client:
                raise HTTPException(
                    status_code=500,
                    detail="Le mot de passe est manquant dans la base de données."
                )

            if not verify_password(password, client["password"]):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Identifiants incorrects"
                )

            return ClientInDB(**client)