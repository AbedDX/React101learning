from flask import Flask, render_template, request, redirect, url_for
import cloudinary
from cloudinary.uploader import upload
from dotenv import load_dotenv
import time
import os

load_dotenv()

app = Flask(__name__)

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET"),
    sercet_url=True
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'file' not in request.files:
            return redirect(request.url)

        file = request.files['file']

        # If the user does not select a file, the browser submits an empty file without a filename
        if file.filename == '':
            return redirect(request.url)

        folder = "movie_img/"

        # Calculate the timestamp
        timestamp = int(time.time())

        # Upload file to Cloudinary with timestamp
        result = upload(file, folder=folder, timestamp=timestamp)
        # result contains information about the uploaded file, including the public URL

        # You can now use result['url'] to get the URL of the uploaded image

        return render_template('upload_result.html', result=result)

if __name__ == '__main__':
    app.run(debug=True, port=3001)
