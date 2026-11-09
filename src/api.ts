import type { SearchResponse } from './types/movie';

const API_KEY = import.meta.env.VITE_OMDB_APIKEY;

export async function searchMovies(query: string): Promise<SearchResponse> {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
  );
  return response.json();
}