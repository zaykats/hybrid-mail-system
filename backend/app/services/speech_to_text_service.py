# app/services/speech_to_text_service.py

import httpx
from fastapi import UploadFile

# Fix the URL: Remove extra spaces!
NGROK_API_URL = 

async def transcribe_audio_file(file: UploadFile) -> str:
    try:
        contents = await file.read()
        files = {"file": (file.filename, contents, file.content_type)}

        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(NGROK_API_URL, files=files)

        # Log status and response for debugging
        print(f" Transcription response status: {response.status_code}")
        print(f" Response text: {response.text}")

        if response.status_code != 200:
            raise Exception(f"Transcription failed with status {response.status_code}: {response.text}")

        # Parse JSON
        try:
            data = response.json()
        except Exception as e:
            raise Exception(f"Invalid JSON in transcription response: {e}, body={response.text}")

        transcription = data.get("transcription")
        if not transcription:
            raise Exception(f"No transcription in response: {data}")

        return transcription

    except Exception as e:
        print(f" Transcription error: {str(e)}")
        raise  # Re-raise with message