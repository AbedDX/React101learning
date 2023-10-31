from app import db
##from .genre import Genre  # If you have a Genre model

class Movie(db.Document):
    title = db.StringField(required=True)
    description = db.StringField()
    #genre = db.ReferenceField(Genre)  # Reference to Genre model
    actors = db.ListField(db.StringField())
    director = db.StringField()
    release_year = db.IntField()
    rating = db.DecimalField(min_value=0, max_value=10)
    poster_url = db.StringField()
    video_url = db.StringField()
    # Add other movie-related fields as needed
