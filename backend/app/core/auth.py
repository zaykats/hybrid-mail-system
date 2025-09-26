# # backend/app/core/auth.py

# from app.models.client_model import ClientInDB
# from app.core.hashing import verify_password

# def authenticate_client(email: str, password: str) -> ClientInDB | None:
#     """
#     Vérifie si les identifiants sont corrects et retourne le client,
#     ou None si l’authentification échoue.
#     """
#     # À remplacer par un vrai appel à la base de données
#     fake_client = ClientInDB(
#         id="CLI20250405123456",
#         intitule="Jean Dupont",
#         adresse="123 Rue du Code",
#         ville="Casablanca",
#         telephone="0612345678",
#         email=email,
#         typeClient="particulier",
#         identifiantclient="CLI20250405123456",
#         created_at="2025-04-05T12:00:00Z"
#     )

#     # Simuler une vérification de mot de passe
#     if verify_password(password, "$2b$12$KPIt.QqfBPlRlXWvDJejCe9ONNsvuD7.RV6nUkMgQYJGc6uP5S7yK"):
#         return fake_client
#     return None




# backend/app/core/auth.py

from app.core.hashing import verify_password

def authenticate_client(plain_password: str, hashed_password: str) -> bool:
    """
    Vérifie si le mot de passe fourni correspond au mot de passe hashé.
    Retourne True si c'est correct, False sinon.
    """
    return verify_password(plain_password, hashed_password)
