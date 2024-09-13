import { Movie } from '../../types'; 

const BASE_URL = 'http://localhost:3000/api/movies';

type MovieFilters = {
  id?: string;
  name?: string;
  year?: string;
  actor?: string;
};

export const fetchMovies = async (
  page: number, 
  limit: number, 
  filters: MovieFilters = {}
): Promise<Movie[]> => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v != null))
  });

  const endpoint = Object.keys(filters).find(key => filters[key as keyof MovieFilters]) || '';

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}?${queryParams.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.movies)) {
      return data.movies;
    } else if (data && typeof data === 'object') {
      return [data];
    } else {
      console.warn('Unexpected data structure:', data);
      return [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch movies:', error.message);
    } else {
      console.error('An unknown error occurred while fetching movies');
    }
    throw error;
  }
};