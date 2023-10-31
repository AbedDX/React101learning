from app import app
from flask import request, jsonify

@app.route('/api/movies', methods=['GET'])
def get_movies():
    # Implement logic to get a list of movies
    movies = [{'title': 'Movie 1', 'description': 'Description 1'},
              {'title': 'Movie 2', 'description': 'Description 2'}]
    return jsonify({'movies': movies})
