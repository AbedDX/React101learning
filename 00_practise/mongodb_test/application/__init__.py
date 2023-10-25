from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["SECRET_KEY"] = "7f4637bfd5f90382e80ce76b5edbc9715f5c7ee6"
app.config["MONGO_URI"] = "mongodb+srv://DAX:pfVzE9PwXd8Sk2Xa@testcluster.c6qnegk.mongodb.net/?retryWrites=true&w=majority"

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

