# backend/Dockerfile

# Étape de build
FROM python:3.10-slim as builder

WORKDIR /app

COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Étape finale
FROM python:3.10-slim

WORKDIR /app

COPY --from=builder /root/.local /usr/local
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]