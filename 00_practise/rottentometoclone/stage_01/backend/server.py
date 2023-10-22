from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello, World"

#Member API Route
@app.route("/members")
def members():
    return {"members": ["member1", "member2", "member3"]}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
