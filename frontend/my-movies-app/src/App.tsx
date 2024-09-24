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

  // Function to fetch movies
  const fetchAndSetMovies = async (currentPage: number, isLoadMore = false) => {
    const setLoadingState = isLoadMore ? setLoadingMore : setLoading;
    setLoadingState(true);

    try {
      const movieData = await fetchMovies(currentPage, 10);
      setMovies(prevMovies => {
        const allMovies = isLoadMore ? [...prevMovies, ...movieData] : movieData;
        // Remove duplicates using Map
        const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie._id, movie])).values());
        return uniqueMovies;
      });

      if (isLoadMore) {
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      setError(isLoadMore ? 'Failed to fetch more movie data.' : 'Failed to fetch movie data.');
    } finally {
      setLoadingState(false);
    }
  };

  // Initial load, only once when component mounts
  useEffect(() => {
    fetchAndSetMovies(1);
  }, []); // Empty dependency array to avoid double-fetching

  // Load more movies when "Load More" is clicked
  const loadMoreMovies = () => {
    fetchAndSetMovies(page + 1, true);
  };

  // Handle search with filters
  const handleSearch = async (query: string, filters: { id?: string; name?: string; year?: string; actor?: string }) => {
    setLoading(true);
    try {
      const movieData = await fetchMovies(1, 10, filters); // Pass filters to the API
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
            onClick={loadMoreMovies} // Trigger loading more movies
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