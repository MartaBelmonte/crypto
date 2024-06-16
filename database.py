from pymongo import MongoClient
import certifi

MONGO_URI = 'mongodb+srv://martabelmonts5:123456a.@cluster0.xmvqktj.mongodb.net/db_cryptos?retryWrites=true&w=majority&appName=Cluster0'
ca = certifi.where()


def db_connection():
    try:
        client = MongoClient(MONGO_URI, tlsCAFile=ca)
        db = client["crypto2"]
        return db
    except Exception as e:
        print(f"Error de conexión a MongoDB Atlas: {e}")
        return None
