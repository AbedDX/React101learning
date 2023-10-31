import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({ movies: [] });

  useEffect(() => {
    fetch("/movies") // Assuming this is the correct API endpoint
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Movie List</h1>
      {data.movies.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.movies.map((movie) => (
            <li key={movie._id}>
              <h2>{movie.title}</h2>
              <p>Description: {movie.description}</p>
              <p>Genre: {movie.genre}</p>
              <p>Rating: {movie.rating}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
