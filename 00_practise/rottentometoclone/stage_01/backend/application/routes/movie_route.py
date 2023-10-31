from flask import Blueprint, request, jsonify
from application.models.movie import Movie

movies_api = Blueprint('movies', __name__)

# List all movies
@movies_api.route('/movies', methods=['GET'])
def list_movies():
    movies = Movie.get_all_movies()
    movie_list = []

    for movie in movies:
        movie_list.append({'_id': str(movie['_id']), 'title': movie['title'], 'rating': movie['rating']})

    return jsonify({'movies': movie_list})

# Delete a movie by its ID
@movies_api.route('/movies/<string:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    result = Movie.delete(movie_id)
    
    if result.deleted_count == 0:
        return jsonify({'error': 'Movie not found'}), 404

    return jsonify({'message': 'Movie deleted successfully'})

# Add a new movie
@movies_api.route('/movies', methods=['POST'])
def add_movie():
    data = request.json
    title = data.get('title')
    description = data.get('description')
    genre = data.get('genre')
    release_date = data.get('release_date')
    rating = data.get('rating')

    if not title or not rating:
        return jsonify({'error': 'Missing data'}), 400

    new_movie = Movie(title, description, genre, release_date, rating)
    inserted_id = new_movie.save()

    return jsonify({'message': 'Movie added successfully', 'movie_id': inserted_id}), 201
