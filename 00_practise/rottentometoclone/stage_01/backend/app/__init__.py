from flask import Flask
from flask_mongoengine import MongoEngine
from dotenv import load_dotenv

app = Flask(__name__)

# Load environment variables from .env
load_dotenv()

# Load app configuration from config.py
app.config.from_object('app/config')

# Initialize the MongoDB database
db = MongoEngine(app)
