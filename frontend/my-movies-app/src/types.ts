export type Movie = {
  _id: string;
  plot: string;
  genres: string[];
  runtime: number;
  cast: string[];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: string;
  directors: string[];
  writers: string[];
  awards: {
    text: string;
  };
  lastupdated: string;
  year: number;
  imdb: {
    rating: number;
    votes?: number;
    id?: number;
  };
  countries: string[];
  type: string;
  tomatoes: {
    viewer: {
      rating: number;
      numReviews?: number;
      meter?: number;
    };
    critic?: {
      rating: number;
      numReviews: number;
      meter: number;
    };
    fresh?: number;
    rotten?: number;
  };
  plot_embedding: unknown[]; // Using unknown[] for better type safety
};

export type MovieFilters = {
  id?: string;
  name?: string;
  year?: string;
  actor?: string;
};

export type FetchMoviesResponse = {
  movies: Movie[];
  total: number;
  page: number;
  limit: number;
};