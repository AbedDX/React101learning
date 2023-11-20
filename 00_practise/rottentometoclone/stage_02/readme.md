# Rotten Tomatoes Movie Database

Rotten Tomatoes Movie Database is a web application that allows users to browse and manage a collection of movies. The app fetches information, rating, description, and youtube embed link from MongoDB.
Movie images are fetched from Cloudinary where cloudinary Url will be store in mongodb. The project is a work in progress, and its current features include:

- Browse a collection of movies
- View movie details, including title, description, genre, release date, and rating
- Add new movies to the database (work in progress)
- User authentication for login and signup (work in progress)

## Prerequisites

### Backend (Flask)

Make sure you have the following installed on your machine:

- Flask
- Flask-CORS
- Flask-PyMongo
- python-dotenv
- Cloudinary

### Frontend (React and Semantic UI)

Make sure you have Node.js and npm installed on your machine.

How to Start
Backend
Navigate to the backend directory.

Install the required dependencies:

bash
pip install -r requirements.txt
Set up environment variables by creating a .env file in the backend directory. Configure variables like FLASK_APP, FLASK_ENV, MONGO_URI, and CLOUDINARY_URL.

Run the Flask application:

bash
flask run
Frontend
Navigate to the frontend directory.

Install the required dependencies:

bash
npm install
Start the React application:

bash
npm start
Visit http://localhost:3000 in your web browser to explore the movie collection and use the application.

Future Improvements
This project is an ongoing endeavor, and there are several areas for improvement:

- Complete user authentication for login and signup.
- UI style improvement






