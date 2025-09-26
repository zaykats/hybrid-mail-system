# from typing import Optional
# from app.models.admin_model import AdminCreate, AdminInDB, AdminUpdate
# from app.db.mongo import mongo
# from app.core.hashing import hash_password
# from fastapi import HTTPException
# from datetime import datetime
# from typing import List

# class AdminViewModel:
#     # def __init__(self):
#     #     self.collection = mongo.db["admins"]
#     @property
#     def collection(self):
#         if mongo.db is None:
#             raise HTTPException(status_code=500, detail="Database not initialized")
#         return mongo.db["admins"]


#     async def create_admin(self, admin: AdminCreate) -> AdminInDB:
#         existing = await self.collection.find_one({"email": admin.email})
#         if existing:
#             raise HTTPException(
#                 status_code=400,
#                 detail="Un administrateur existe déjà avec cet e-mail"
#             )

#         hashed_pwd = hash_password(admin.password)
#         admin_data = admin.model_dump()
#         admin_data["password"] = hashed_pwd
#         admin_data["created_at"] = datetime.utcnow()


#         result = await self.collection.insert_one(admin_data)
#         admin_data["id"] = str(result.inserted_id)
#         return AdminInDB(**admin_data)
 
#     async def get_admin_by_email(self, email: str) -> Optional[AdminInDB]:
#         data = await self.collection.find_one({"email": email})
#         if not data:
#             return None
#         return AdminInDB(**data)

#     async def update_admin(self, admin_id: str, update_data: AdminUpdate) -> AdminInDB:
#         update_data_dict = update_data.model_dump(exclude_unset=True)
#         result = await self.collection.update_one(
#             {"id": admin_id},
#             {"$set": update_data_dict}
#         )
#         if result.matched_count == 0:
#             raise HTTPException(status_code=404, detail="Administrateur non trouvé")
#         updated = await self.get_admin_by_email(update_data.email or "")
#         return updated
    
#     async def get_all_admins(self) -> List[AdminInDB]:
#         admins_cursor = self.collection.find({}, {'_id': 0})  
#         admins = []
#         async for admin in admins_cursor:
#             admins.append(AdminInDB(**admin))
#     #     return admins
#     # async def get_all_admins(self) -> List[AdminInDB]:
#     #     admins_cursor = self.collection.find({})
#     #     admins = []
#     #     async for admin in admins_cursor:
#     #         admin_dict = dict(admin)
            
#     #         # Map MongoDB '_id' to 'id' as a string
#     #         admin_dict['id'] = str(admin_dict.pop('_id'))
            
#     #         # Provide created_at, use existing or default now()
#     #         if 'created_at' not in admin_dict:
#     #             admin_dict['created_at'] = datetime.utcnow()
            
#     #         admins.append(AdminInDB(**admin_dict))
#     #     return admins












from typing import Optional, List
from app.models.admin_model import AdminCreate, AdminInDB, AdminUpdate
from app.db.mongo import mongo
from app.core.hashing import hash_password
from fastapi import HTTPException
from datetime import datetime
from app.utils.helpers import generate_client_id

class AdminViewModel:
    @property
    def collection(self):
        if mongo.db is None:
            raise HTTPException(status_code=500, detail="Database not initialized")
        return mongo.db["admins"]


    async def create_admin(self, admin: AdminCreate) -> AdminInDB:
        existing = await self.collection.find_one({"email": admin.email})
        if existing:
            raise HTTPException(
                status_code=400,
                detail="Un administrateur existe déjà avec cet e-mail"
            )

        hashed_pwd = hash_password(admin.password)
        admin_data = admin.model_dump()
        admin_data["password"] = hashed_pwd
        admin_data["id"] = generate_client_id()  # Use helper
        admin_data["created_at"] = datetime.utcnow()
        admin_data["updated_at"] = None

        await self.collection.insert_one(admin_data)
        return AdminInDB(**admin_data)
 
    async def get_admin_by_email(self, email: str) -> Optional[AdminInDB]:
        data = await self.collection.find_one({"email": email})
        if not data:
            return None
        return AdminInDB(**data)

    async def update_admin(self, admin_id: str, update_data: AdminUpdate) -> AdminInDB:
        update_data_dict = update_data.model_dump(exclude_unset=True)
        update_data_dict["updated_at"] = datetime.utcnow()
        
        result = await self.collection.update_one(
            {"id": admin_id},
            {"$set": update_data_dict}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Administrateur non trouvé")
        
        updated = await self.collection.find_one({"id": admin_id}, {'_id': 0})
        return AdminInDB(**updated)
    
    async def get_all_admins(self) -> List[AdminInDB]:
        admins_cursor = self.collection.find({}, {'_id': 0})  # Exclude _id
        admins = []
        async for admin in admins_cursor:
            # Ensure created_at exists
            if "created_at" not in admin:
                admin["created_at"] = datetime.utcnow()
            if "updated_at" not in admin:
                admin["updated_at"] = None
            admins.append(AdminInDB(**admin))
        return admins
