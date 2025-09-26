# backend/app/utils/helpers.py

import uuid
from datetime import datetime

def generate_client_id():
    """
    Génère un identifiant unique pour un client.
    Exemple : CLI20250405123456
    """
    return f"CLI{datetime.utcnow().strftime('%Y%m%d%H%M%S')}{str(uuid.uuid4())[:4]}"

def generate_unique_code(client_id: str, recipient_id: str):
    """
    Génère un code unique pour une lettre.
    Format : idClient_date_heure(ISO)
    """
    timestamp = datetime.utcnow().strftime("%Y%m%d%H%M%S%f")[:-3]  # AAAAMMJJHHmmssSSS
    return f"{client_id}_{timestamp}"