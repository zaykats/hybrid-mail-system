from fastapi import APIRouter, Depends, UploadFile, File,HTTPException
from app.models.lettre_model import LettreCreate, LettreInDB, LettreUpdate
from app.viewmodels.lettre_vm import LettreViewModel
from typing import List
from pydantic import BaseModel
from fastapi import Body
from typing import Optional

class ClientInfo(BaseModel):
    name: Optional[str]
    address: Optional[str]
    city: Optional[str]
    postalCode: Optional[str]
    country: Optional[str]
    email: Optional[str]
    telephone: Optional[str]
    identifiantclient: Optional[str]
    id: Optional[str]

class AIGenerateRequest(BaseModel):
    prompt: str
    tone: str
    length: str  # short / medium / long
    client: Optional[ClientInfo] = None  # <-- added client info


router = APIRouter()
lettre_vm = LettreViewModel()

@router.post("/lettres", response_model=LettreInDB, status_code=201)
async def create_lettre(lettre: LettreCreate):
    return await lettre_vm.create_lettre(lettre)

@router.get("/lettres/{lettre_id}", response_model=LettreInDB)
async def get_lettre(lettre_id: str):
    lettre = await lettre_vm.get_lettre_by_id(lettre_id)
    if not lettre:
        raise HTTPException(status_code=404, detail="Lettre non trouvée")
    return lettre

@router.put("/lettres/{lettre_id}/statut", response_model=LettreInDB)
async def update_statut_lettre(lettre_id: str, update_data: LettreUpdate):
    return await lettre_vm.update_statut(lettre_id, update_data)



@router.post("/lettres/generate", tags=["AI"])
async def generate_letter(req: AIGenerateRequest):
    # Build a client info string if client info is provided
    client_details = ""
    if req.client:
        ci = req.client
        client_details = (
            f"\n\nInformations client:\n"
            f"Nom: {ci.name or '[Nom non fourni]'}\n"
            f"Adresse: {ci.address or '[Adresse non fournie]'}, {ci.city or ''}, {ci.postalCode or ''}, {ci.country or ''}\n"
            f"Email: {ci.email or '[Email non fourni]'}\n"
            f"Téléphone: {ci.telephone or '[Téléphone non fourni]'}\n"
            f"Identifiant client: {ci.identifiantclient or '[ID non fourni]'}"
        )

    full_prompt = req.prompt + client_details

    generated_letter = await lettre_vm.generate_letter_from_prompt(
        prompt=full_prompt,
        tone=req.tone,
        length=req.length
    )
    return {"generated_letter": generated_letter}

@router.get("/clients/{client_id}/lettres", response_model=List[LettreInDB])
async def get_lettres_by_client(client_id: str):
    return await lettre_vm.get_lettres_by_client(client_id)

@router.post("/transcribe/")
async def speech_to_text_api(file: UploadFile = File(...)):
    try:
        transcription = await lettre_vm.transcribe(file)
        return {"transcription": transcription}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))