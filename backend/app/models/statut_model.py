from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class StatutBase(BaseModel):
    lettre_id: str
    statut: str  # Enum: Commande déclarée, Pris en charge, Livré
    description: Optional[str] = None
    destinataire_cin: Optional[str] = None

class StatutCreate(StatutBase):
    pass

class StatutInDB(StatutBase):
    id: str
    timestamp: datetime

    class Config:
        from_attributes = True