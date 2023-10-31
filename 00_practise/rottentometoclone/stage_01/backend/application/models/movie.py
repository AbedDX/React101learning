from application import mongodb
from bson import ObjectId
from datetime import datetime

class Movie:
    def __init__(self, title, description, genre, release_date, rating):
        self.data = {
            "title": title,
            "description": description,
            "genre": genre,
            "release_date": release_date,
            "rating": rating,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }

    def save(self):
        result = mongodb.db.movies.insert_one(self.data)
        return str(result.inserted_id)

    @staticmethod
    def get_all_movies():
        movies = list(mongodb.db.movies.find({}, {"_id": 1, "title": 1, "description": 1, "genre": 1, "release_date": 1, "rating": 1, "created_at": 1, "updated_at": 1}))
        return movies

    @staticmethod
    def get_movie_by_id(movie_id):
        movie = mongodb.db.movies.find_one({"_id": ObjectId(movie_id)})
        return movie

    def update(self, movie_id):
        updated_data = {
            "title": self.data["title"],
            "description": self.data["description"],
            "genre": self.data["genre"],
            "release_date": self.data["release_date"],
            "rating": self.data["rating"],
            "updated_at": datetime.utcnow()
        }
        mongodb.db.movies.update_one({"_id": ObjectId(movie_id)}, {"$set": updated_data})

    @staticmethod
    def delete(movie_id):
        result = mongodb.db.movies.delete_one({"_id": ObjectId(movie_id)})
        return result

    def to_dict(self):
        return {
            "title": self.data["title"],
            "description": self.data["description"],
            "genre": self.data["genre"],
            "release_date": self.data["release_date"],
            "rating": self.data["rating"],
            "created_at": self.data["created_at"],
            "updated_at": self.data["updated_at"]
        }
