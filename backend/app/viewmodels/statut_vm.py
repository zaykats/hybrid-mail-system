from typing import List
from app.models.statut_model import StatutBase, StatutInDB
from app.db.mongo import mongo
from datetime import datetime
from fastapi import HTTPException

class StatutViewModel:
    @property
    # def __init__(self):
    #     self.collection = db["statuts"]
    def collection(self):
        if mongo.db is None:
            raise HTTPException(status_code=500, detail="Database not initialized")
        return mongo.db["statuts"]
    
    async def add_statut(self, statut: StatutBase) -> StatutInDB:
        statut_data = statut.model_dump()
        statut_data["timestamp"] = datetime.utcnow()
        await self.collection.insert_one(statut_data)
        return StatutInDB(**statut_data)

    async def get_statuts_by_lettre(self, lettre_id: str) -> List[StatutInDB]:
        cursor = self.collection.find({"lettre_id": lettre_id})
        results = [StatutInDB(**doc) async for doc in cursor]
        return results