from app.core.hashing import hash_password, verify_password

hashed = hash_password("zaynab")
print("Hashed password:", hashed)

print(verify_password("zaynab", hashed))  # Doit retourner True
