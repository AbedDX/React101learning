import os

class Config:
    DEBUG = True
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key')
    MONGODB_SETTINGS = {
        'db': os.getenv('MONGO_DB', 'netflix_clone_db'),
        'host': os.getenv('MONGO_URI', 'mongodb://localhost/netflix_clone_db')
    }
