import React from 'react';
import { Movie } from './../../types';
import './MovieModal.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay" key={movie.title}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>{movie.title} ({movie.year})</h2>
        <img 
          src={movie.poster || 'https://via.placeholder.com/200x300?text=No+Poster'}
          alt={`${movie.title} Poster`} 
          style={{ width: '200px', height: '300px' }} 
        />
        <p><strong>Plot:</strong> {movie.plot}</p>
        <p><strong>Full Plot:</strong> {movie.fullplot}</p>
        <p><strong>Released:</strong> {new Date(movie.released).toLocaleDateString()}</p>
        <p><strong>Genres:</strong> {movie.genres?.join(', ')}</p>
        <p><strong>Cast:</strong> {movie.cast?.join(', ')}</p>
        <p><strong>Languages:</strong> {movie.languages?.join(', ')}</p>
        <p><strong>Directors:</strong> {movie.directors.join(', ')}</p>
        <p><strong>Writers:</strong> {movie.writers.join(', ')}</p>
        <p><strong>Awards:</strong> {movie.awards.text || 'N/A'}</p>
        <p><strong>IMDB Rating:</strong> {movie.imdb?.rating || 'N/A'}</p>
        <p><strong>Comments:</strong> {movie.num_mflix_comments}</p>
        <p><strong>Movie Type:</strong> {movie.type}</p>
        <p><strong>Last Updated:</strong> {new Date(movie.lastupdated).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default MovieModal;
