from flask import Blueprint, request, jsonify
from application.models.movie import Movie
from application import mongodb

movies_api = Blueprint("movies", __name__)

@movies_api.route("/movies", methods=["GET"])
def list_movies():
    movies = Movie.get_all_movies()
    movie_list = []

    for movie in movies:
        movie_data = {
            "_id": str(movie["_id"]),  # Corrected the field name to "_id"
            "title": movie["title"],
            "description": movie["description"],
            "genre": movie["genre"],
            "rating": movie["rating"],
        }
        movie_list.append(movie_data)

    return jsonify({"movies": movie_list})

@movies_api.route("/movies/<string:movie_id>", methods=["DELETE"])
def delete_movie(movie_id):
    result = Movie.delete(movie_id)
    
    if result.deleted_count == 0:
        return jsonify({"error": "Movie not found"}), 404

    return jsonify({"message": "Movie deleted successfully"})

@movies_api.route("/movies", methods=["POST"])
def add_movie():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    genre = data.get("genre")
    release_date = data.get("release_date")
    rating = data.get("rating")

    if not title or not rating:
        return jsonify({"error": "Missing data"}), 400

    new_movie = Movie(title, description, genre, release_date, rating)
    inserted_id = new_movie.save()

    return jsonify({"message": "Movie added successfully", "movie_id": inserted_id}), 201
