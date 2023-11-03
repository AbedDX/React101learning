from application import app, jsonify

class User:
    def singup(self):
        user = {
            "_id": "",
            "name": "",
            "email": "",
            "password": ""
        }
        return jsonify (user), 200