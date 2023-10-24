from app import app
from flask import request, jsonify
from  ..models.user import User

@app.route("/api/register", method=["POST"])
def register():
    data = request.get_json()
    new_user = User(username=data["username"], email=data["email"], password=data["password"])
    new_user.save()
    return jsonify({"message": "User registered successfully"})