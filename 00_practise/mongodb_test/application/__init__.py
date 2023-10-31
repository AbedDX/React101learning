from flask import Flask
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
MONGO_URI = os.getenv("MONGO_URI")

app.config["SECRET_KEY"] = SECRET_KEY
app.config["MONGO_URI"] = MONGO_URI

# setup moggodb
mongodb_client = PyMongo(app)
db = mongodb_client

# Create a connection checker function
def check_mongo_connection():
    try:
        # Attempt to establish a connection
        db.cx.server_info()
        return True
    except Exception as e:
        print(f"MongoDB connection error: {e}")
        return False

# Check the MongoDB connection
if check_mongo_connection():
    print("MongoDB connection successful.")
else:
    print("MongoDB connection failed. Please check your configuration.")

from application.route import routes

