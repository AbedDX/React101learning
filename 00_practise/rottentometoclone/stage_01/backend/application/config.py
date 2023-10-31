import os
# Read environment variables 
class Config:
    # Access environment variables directly
    SECRET_KEY = os.getenv("SECRET_KEY")
    MONGO_URI = os.getenv("MONGO_URI")
    print(SECRET_KEY,MONGO_URI)