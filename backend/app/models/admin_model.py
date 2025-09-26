from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class AdminBase(BaseModel):
    nom: str
    email: str
    ville: str
    lieu_du_centre: str
    password: str


class AdminCreate(AdminBase):
    password: str

class AdminUpdate(BaseModel):
    nom: Optional[str]
    email: Optional[str]
    ville: Optional[str]
    lieu_du_centre: Optional[str]

class AdminInDB(AdminBase):
    id: str  # ObjectId as string
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True