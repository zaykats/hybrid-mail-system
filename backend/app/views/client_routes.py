from fastapi import APIRouter, Depends, HTTPException
from app.models.client_model import ClientCreate, ClientInDB,ClientUpdate

from app.viewmodels.client_vm import ClientViewModel
from typing import List

router = APIRouter()
client_vm = ClientViewModel()

@router.post("/clients", response_model=ClientInDB, status_code=201)
async def create_client(client: ClientCreate):
    return await client_vm.create_client(client)

@router.get("/clients/{client_id}", response_model=ClientInDB)
async def get_client(client_id: str):
    client = await client_vm.get_client_by_id(client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client non trouvé")
    return client

@router.put("/clients/{client_id}", response_model=ClientInDB)
async def update_client(client_id: str, client_update: ClientUpdate):
    updated = await client_vm.update_client(client_id, client_update)
    return updated

@router.get("/clients", response_model=List[ClientInDB])
async def list_all_clients():
    clients = await client_vm.get_all_clients()
    return clients