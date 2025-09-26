
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """
    Configuration globale du projet, chargée depuis les variables d'environnement.
    """
    MONGO_URL: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "mydatabase"  # Nom de la base MongoDB
    JWT_SECRET: str
    ALGORITHM: str = "HS256"  
    OPENAI_API_KEY: str  

    class Config:
        env_file = ".env"  

settings = Settings()

