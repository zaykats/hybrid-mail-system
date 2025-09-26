from fastapi import FastAPI
from app.views import client_routes, lettre_routes, admin_routes, auth_routes
from app.db.mongo import connect_to_mongo, close_mongo_connection

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Système de gestion de lettres hybride")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # or ["*"] during development
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP methods including OPTIONS
    allow_headers=["*"],  # allow all headers including Authorization
)

# --- Register MongoDB connection events ---
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

app.include_router(client_routes.router, prefix="/api/v1", tags=["Clients"])
app.include_router(lettre_routes.router, prefix="/api/v1", tags=["Lettres"])
app.include_router(admin_routes.router, prefix="/api/v1", tags=["Administrateurs"])
app.include_router(auth_routes.router, tags=["Authentification"])

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur le système de gestion de lettres"}