import React, { useState } from 'react';
import { Movie } from '../../types';
import './MoviesList.css'; // Assuming you have external CSS for styling
import MovieModal from './MovieModal'; // Modal component

const MoviesList: React.FC<{ movies: Movie[] }> = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movies-list">
      {movies.map((movie: Movie) => (
        <div key={movie._id} className="movie-card">
          <h2>{movie.title} ({movie.year})</h2>
          <div className="movie-poster-container">
            <img
              src={movie.poster || 'https://via.placeholder.com/200x300?text=No+Poster'}
              alt={`${movie.title} Poster`}
              className="movie-poster"
            />
          </div>
          <p><strong>Released:</strong> {new Date(movie.released).toLocaleDateString()}</p>
          <p><strong>Genres:</strong> {movie.genres?.join(', ')}</p>
          <p><strong>Cast:</strong> {movie.cast?.join(', ')}</p>
          <button
            className="view-details-btn"
            onClick={() => openModal(movie)}
          >
            View Details
          </button>
        </div>
      ))}

      {/* {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )} */}
    </div>
  );
};

export default MoviesList;
