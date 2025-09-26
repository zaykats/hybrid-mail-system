# from fastapi import APIRouter, Depends, HTTPException, status
# from app.models.client_model import ClientCreate, ClientInDB
# from app.core.auth import authenticate_client
# from app.viewmodels.client_vm import ClientViewModel

# router = APIRouter()
# client_vm = ClientViewModel()

# # @router.post("/login")
# # async def login(email: str, password: str):
# #     client = await client_vm.get_client_by_email(email)
# #     if not client or not authenticate_client(password, client.password):
# #         raise HTTPException(
# #             status_code=status.HTTP_401_UNAUTHORIZED,
# #             detail="Identifiants incorrects"
# #         )
# #     # À remplacer par génération JWT dans une version ultérieure
# #     return {"message": "Authentification réussie", "client_id": client.id}



# @router.post("/login")


# async def login(email: str, password: str):
#     client = await client_vm.authenticate_clientvm(email, password)
#     return {"message": "Authentification réussie", "client_id": client.id}



from fastapi import APIRouter, Depends, HTTPException, status
from app.models.client_model import ClientCreate, ClientInDB
from app.core.auth import authenticate_client
from app.viewmodels.client_vm import ClientViewModel

from pydantic import BaseModel
router = APIRouter()
client_vm = ClientViewModel()
class LoginData(BaseModel):
    email: str
    password: str

@router.post("/login")
async def login(data: LoginData):
    client = await client_vm.authenticate_clientvm(data.email, data.password)
    # return {"message": "Authentification réussie", "client_id": client.id}
    #Convert to dict, exclude password
    client_data = client.dict()
    client_data.pop("password", None)  
    # Add optional fields like country/postalCode
    client_data.update({
        "postalCode": "10000",
        "country": "Maroc"
    })

    return {
        "message": "Authentification réussie",
        "client": client_data
    }