import React from "react";
import { Card, Rating, Image, Modal, Embed } from "semantic-ui-react";
import "./model-style.css";

export const Movies = ({ movies }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [youtubeLink, setYoutubeLink] = React.useState(null);

  const openModal = async (movie) => {
    setModalOpen(true);

    if (movie.youtube) {
      try {
        const response = await fetch(`/movies/${movie._id}/youtube_link`);
        if (response.ok) {
          const data = await response.json();
          setYoutubeLink(data.youtube_link);
        } else {
          // Handle the error case
          console.error("Failed to fetch YouTube link");
        }
      } catch (error) {
        console.error("An error occurred while fetching YouTube link", error);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setYoutubeLink(null);
  };

  return (
    <Card.Group itemsPerRow={5}>
      {movies.map((movie) => (
        <Card key={movie._id}>
          <Image
            src={movie.cloudinary_url || "images/imgholder.jpg"}
            className="Banner"
            alt=""
            style={{ width: "266px", height: "250px" }}
            onClick={() => openModal(movie)}
          />
          <Card.Content>
            <Card.Header onClick={() => openModal(movie)}>
              {movie.title}
            </Card.Header>
            <Card.Description>
              <Rating icon="star" defaultRating={movie.rating} maxRating={5} disabled />
            </Card.Description>
          </Card.Content>
        </Card>
      ))}

      <Modal open={modalOpen} onClose={closeModal} size="small" closeIcon>
        <Modal.Content >
          {youtubeLink && (
              <Embed
                id={youtubeLink}
                source="youtube"
                style={{backgroundColor: 'black' }}
                iframe={{
                  allowFullScreen: true,
                  autoPlay:true
                }}
              />
          )}
        </Modal.Content>
      </Modal>
    </Card.Group>
  );
};
