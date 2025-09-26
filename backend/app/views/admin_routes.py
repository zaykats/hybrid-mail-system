from fastapi import APIRouter, Depends, HTTPException
from app.models.admin_model import AdminCreate, AdminInDB ,AdminUpdate
from app.viewmodels.admin_vm import AdminViewModel
from typing import List

router = APIRouter()
admin_vm = AdminViewModel()

@router.post("/admins", response_model=AdminInDB, status_code=201)
async def create_admin(admin: AdminCreate):
    return await admin_vm.create_admin(admin)

@router.get("/admins/{admin_email}", response_model=AdminInDB)
async def get_admin(admin_email: str):
    admin = await admin_vm.get_admin_by_email(admin_email)
    if not admin:
        raise HTTPException(status_code=404, detail="Administrateur non trouvé")
    return admin

@router.put("/admins/{admin_id}", response_model=AdminInDB)
async def update_admin(admin_id: str, admin_update: AdminUpdate):
    return await admin_vm.update_admin(admin_id, admin_update)


@router.get("/admins", response_model=List[AdminInDB])
async def get_all_admins():
    admins = await admin_vm.get_all_admins()
    return admins