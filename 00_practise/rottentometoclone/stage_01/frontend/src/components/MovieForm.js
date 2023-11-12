import React, { useState } from "react";
import { Modal, Button, Form } from "semantic-ui-react";

const MovieForm = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async () => {
    try {
      // Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", imageFile);
      const imageResponse = await fetch("/upload", {
        method: "POST",
        body: imageData,
      });

      if (!imageResponse.ok) {
        throw new Error(`Failed to upload image: ${imageResponse.statusText}`);
      }

      const imageResult = await imageResponse.json();
      const cloudinaryUrl = imageResult.cloudinary_url;

      // Perform the form submission logic, including API calls to add the movie to the database
      const movieData = {
        title,
        description,
        genre,
        release_date: releaseDate,
        rating,
        youtube_link: youtubeLink,
        cloudinary_url: cloudinaryUrl,
      };

      // Send the movie data to your backend
      const response = await fetch("/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add movie: ${response.statusText}`);
      }

      // After successful submission, close the modal
      onClose();
    } catch (error) {
      console.error(error);
      // Handle errors, maybe show an error message to the user
    }
  };

  return (
    <Modal open={open} onClose={onClose} size="small" background={"white"}style={{backgroundColor: 'white' }}>
      <Modal.Header style={{backgroundColor: 'white' }}>Add a New Movie</Modal.Header>
      <Modal.Content style={{backgroundColor: "white" }}>
        <Form background={"white"}>
          <Form.Input
            label="Title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Form.TextArea
            label="Description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Input
            label="Genre"
            placeholder="Enter genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <Form.Input
            label="Release Date"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <Form.Input
            label="Rating"
            placeholder="Enter rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <Form.Input
            label="YouTube Link"
            placeholder="Enter YouTube link"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
          <Form.Input
            type="file"
            label="Image Banner"
            onChange={handleImageChange}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button primary onClick={handleSubmit}>
          Add Movie 🍅
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default MovieForm;




