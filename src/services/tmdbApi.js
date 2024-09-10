const API_KEY = '1f9419b0c6c524a637ea725cbdd45857';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.search = new URLSearchParams({ api_key: API_KEY, ...params });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data from TMDB API');
  }
  return response.json();
};

export const getPopularMovies = () => tmdbApi('/movie/popular');
export const searchMovies = (query, category, currentPage) => tmdbApi(`/search/${category}`, { query, page: currentPage, include_adult: false });
export const getMovieDetails = (movieId) => tmdbApi(`/movie/${movieId}`);
export const getIncomingMovies = () => tmdbApi('/movie/upcoming');
export const getTopRatedMovies = () => tmdbApi('/movie/top_rated');
export const getMovieTrailer = (movieId) => tmdbApi(`/movie/${movieId}/videos`);
export const getMovieCredits = (movieId) => tmdbApi(`/movie/${movieId}/credits`);

