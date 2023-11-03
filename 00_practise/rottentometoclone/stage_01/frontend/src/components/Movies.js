import React from "react";
import { Card, Rating, Image } from "semantic-ui-react";



export const Movies = ({ movies }) => {
  return (
    <Card.Group itemsPerRow={4}>
      {movies.map((movie) => (
        <Card key={movie.id}>
          <Image
              src="images/imgholder.jpg" 
              className ="Banner" 
              alt=""
              style={{ width: "266px", height: "250px" }}/>
          <Card.Content>
            <Card.Header>{movie.title}</Card.Header>
            <Card.Description>
              <Rating icon="star" defaultRating={movie.rating} maxRating={5} disabled />
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};
