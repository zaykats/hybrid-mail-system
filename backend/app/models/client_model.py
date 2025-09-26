from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ClientBase(BaseModel):
    intitule: str
    adresse: str
    ville: str
    telephone: str
    email: str
    typeClient: str  # "particulier", "entreprise", "ministere"
    identifiantclient: str  # Identifiant unique du client
    password: str

class ClientCreate(ClientBase):
    password: str  # Mot de passe temporaire ou initial

class ClientUpdate(BaseModel):
    intitule: Optional[str]
    adresse: Optional[str]
    ville: Optional[str]
    telephone: Optional[str]
    email: Optional[str]
    typeClient: Optional[str]

class ClientInDB(ClientBase):
    id: str  # ObjectId MongoDB
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True