from flask import Blueprint, request, jsonify
from application.models.movie import Movie

movies_api = Blueprint("movies", __name__)

# Add a new movie
@movies_api.route("/movies", methods=["POST"])
def add_movie():
    data = request.json
    title = data.get("title")
    description = data.get("description")
    genre = data.get("genre")
    release_date = data.get("release_date")
    rating = data.get("rating")
    youtube_link = data.get("youtube_link")

    if not title or not rating:
        return jsonify({"error": "Missing data"}), 400

    new_movie = Movie(title, description, genre, release_date, rating, youtube_link)
    inserted_id = new_movie.save()

    return jsonify({"message": "Movie added successfully", "movie_id": inserted_id}), 201

# List all movies
@movies_api.route("/movies", methods=["GET"])
def list_movies():
    movies = Movie.get_all_movies()
    movie_list = []

    for movie in movies:
        movie_list.append({
            "_id": str(movie["_id"]),
            "title": movie["title"],
            "rating": movie["rating"]
        })

    return jsonify({"movies": movie_list})

# Delete a movie by its ID
@movies_api.route("/movies/<string:movie_id>", methods=["DELETE"])
def delete_movie(movie_id):
    result = Movie.delete(movie_id)
    
    if result.deleted_count == 0:
        return jsonify({"error": "Movie not found"}), 404

    return jsonify({"message": "Movie deleted successfully"})

# Update an existing movie by its ID
@movies_api.route("/movies/<string:movie_id>", methods=["PUT"])
def update_movie(movie_id):
    data = request.json
    title = data.get("title")
    description = data.get("description")
    genre = data.get("genre")
    release_date = data.get("release_date")
    rating = data.get("rating")
    youtube_link = data.get("youtube_link")

    if not title or not rating:
        return jsonify({"error": "Missing data"}), 400

    movie = Movie.get_by_id(movie_id)

    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    movie.title = title
    movie.description = description
    movie.genre = genre
    movie.release_date = release_date
    movie.rating = rating
    movie.youtube_link = youtube_link

    movie.save()

    return jsonify({"message": "Movie updated successfully"}), 200

# New route to fetch YouTube links for movies
@movies_api.route("/movies/<string:movie_id>/youtube_link", methods=["GET"])
def get_movie_youtube_link(movie_id):
    movie = Movie.get_by_id(movie_id)

    if not movie:
        return jsonify({"error": "Movie not found"}), 404

    if "youtube_link" not in movie:
        return jsonify({"error": "YouTube link not available for this movie"}), 404

    youtube_link = movie["youtube_link"]

    return jsonify({"youtube_link": youtube_link})





