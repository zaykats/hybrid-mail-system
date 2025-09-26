from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class LettreBase(BaseModel):
    idClient: str
    objet: str
    corps: str
    destinataire_intitule: str
    destinataire_adresse: str
    destinataire_ville: str
    destinataire_telephone: Optional[str] = None
    destinataire_email: Optional[str] = None
    code_unique: str  # AAAAMMJJHHmmssSSS_idDestinataire
    envoyer_sms_alerte: bool
    envoyer_sms_confirmation: bool

class LettreCreate(LettreBase):
    pass

class LettreUpdate(BaseModel):
    statut: Optional[str]  # Pour mise à jour via admin
    destinataire_cin: Optional[str]  # Requis à la livraison

class LettreInDB(LettreBase):
    id: str
    statut: str  # Commande déclarée, Pris en charge, Livré
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True