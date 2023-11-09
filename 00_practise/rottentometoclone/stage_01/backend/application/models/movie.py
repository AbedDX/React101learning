from application import mongodb
from bson import ObjectId
from datetime import datetime

class Movie:
    def __init__(self, title, description, genre, release_date, rating, youtube_link):
        self.title = title
        self.description = description
        self.genre = genre
        self.release_date = release_date
        self.rating = rating
        self.youtube_link= youtube_link
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def save(self):
        movie_data = {
            "title": self.title,
            "description": self.description,
            "genre": self.genre,
            "release_date": self.release_date,
            "rating": self.rating,
            "youtube_link": self.youtube_link,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        result = mongodb.db.movies.insert_one(movie_data)
        return str(result.inserted_id)  # Return the inserted ObjectId as a string

    @staticmethod
    def get_all_movies():
        movies = list(mongodb.db.movies.find({}, {"_id": 1, "title": 1, "rating": 1, "youtube_link": 1}))
        return movies

    @staticmethod
    def get_movie_by_id(movie_id):
        movie = mongodb.db.movies.find_one({"_id": ObjectId(movie_id)})
        return movie

    def update(self, movie_id):
        updated_data = {
            "title": self.title,
            "description": self.description,
            "genre": self.genre,
            "release_date": self.release_date,
            "rating": self.rating,
            "youtube_link":self.youtube_link,
            "updated_at": datetime.utcnow()
        }
        mongodb.db.movies.update_one({"_id": ObjectId(movie_id)}, {"$set": updated_data})

    @staticmethod
    def delete(movie_id):
        result = mongodb.db.movies.delete_one({"_id": ObjectId(movie_id)})
        return result

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "genre": self.genre,
            "release_date": self.release_date,
            "rating": self.rating,
            "youtube_link":self.youtube_link,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
