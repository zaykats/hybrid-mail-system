

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from app.config.settings import settings

def generate_letter_with_langchain(prompt: str, tone: str = "formel", length: str = "medium") -> str:
    GOOGLE_API_KEY="XXXXX"

    llm = ChatGoogleGenerativeAI(
        model="gemini-2.0-flash", 
        temperature=0.3,
        google_api_key=GOOGLE_API_KEY
    )

    # Word count based on length
    word_targets = {
        "short": "100 à 200 mots",
        "medium": "200 à 400 mots",
        "long": "400 à 600 mots"
    }
    target_length = word_targets.get(length, "200 à 400 mots")

    system_message = (
        f"Tu es un assistant expert en rédaction de lettres {tone}. "
        f"Rédige une lettre complète dans un ton {tone}, avec une longueur cible de {target_length}. "
        "Utilise un style professionnel, clair et structuré.\n\n"
        "Si des informations personnelles comme le nom, le montant, la date ou les coordonnées manquent, "
        "remplace-les par des espaces réservés entre crochets. Exemple : [Nom du client], [Montant dû], [Date d'échéance]. "
        "Ne pose pas de questions supplémentaires. Ne donne que le texte final de la lettre."
    )

    full_prompt = f"{system_message}\n\n{prompt}"

    response = llm.invoke([HumanMessage(content=full_prompt)])
    return response.content
