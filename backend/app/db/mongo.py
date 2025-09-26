# from pymongo import MongoClient
# from app.config.settings import settings

# client = MongoClient(settings.MONGO_URL)
# db = client.get_default_database()
# app/db/mongo.py
from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import settings

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

mongo = MongoDB()

async def connect_to_mongo():
    mongo.client = AsyncIOMotorClient(settings.MONGO_URL)
    mongo.db = mongo.client[settings.MONGO_DB_NAME]
    print("Connected to MongoDB")

async def close_mongo_connection():
    mongo.client.close()
    print("MongoDB connection closed")
