import React, { useEffect, useState } from 'react';
import MovieList from './components/moviesList/MoviesList';
import { fetchMovies } from './components/service/MovieService';
import { Movie } from './types';
import Search from './components/search/Search'; 
import './App.css'; // Import the CSS

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const movieData = await fetchMovies(page, 10);
        // Combine old movies with new ones, removing duplicates
        setMovies(prevMovies => {
          const newMovies = movieData;
          const allMovies = [...prevMovies, ...newMovies];
          const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie._id, movie])).values());
          return uniqueMovies;
        });
      } catch (error) {
        setError('Failed to fetch movie data.');
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [page]);

  const loadMoreMovies = async () => {
    setLoadingMore(true);
    try {
      const movieData = await fetchMovies(page + 1, 10); // Ensure to pass limit here
      setMovies(prevMovies => {
        const newMovies = movieData;
        const allMovies = [...prevMovies, ...newMovies];
        const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie._id, movie])).values());
        return uniqueMovies;
      });
      setPage(page + 1);
    } catch (error) {
      setError('Failed to fetch more movie data.');
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = async (query: string, filters: { id?: string; name?: string; year?: string; actor?: string }) => {
    setLoading(true);
    try {
      const movieData = await fetchMovies(page, 10, filters); // Pass filters to the API
      setMovies(movieData);
      setPage(1); // Reset page to 1 for new search
    } catch (error) {
      setError('Failed to fetch movie data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Movie List</h1>
      <Search onSearch={handleSearch} />
      <MovieList movies={movies} />
      <div className="load-more-container">
        {loadingMore ? (
          <div className="loading-spinner">Loading more movies...</div>
        ) : (
          <button
            className="load-more-btn"
            onClick={loadMoreMovies}
            disabled={loadingMore}
          >
            Load More Movies
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
