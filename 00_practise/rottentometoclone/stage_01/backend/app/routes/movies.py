from app import app
from flask import request, jsonify
from ..models.movie import Movie

@app.route("/api/movies", methods=["GET"])
def get_movie():
    # Retrieve a list of movies from the db and return as JSON
    movies = Movie.objects()
    movie_list = [{
        "title": movie.title,
        "genre": movies.genre.name,
        # add other movie details as needed
    } for movie in movies]
    return jsonify({"movie": movie_list})