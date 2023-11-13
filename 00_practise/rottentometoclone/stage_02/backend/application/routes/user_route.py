from flask import Blueprint, request
from application.models.user import User 

user_api = Blueprint('user', __name__)

@user_api.route("/user/signup", methods=["POST"])
def signup():
    return User().singup()
