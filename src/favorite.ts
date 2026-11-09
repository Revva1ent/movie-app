export interface FavoriteMovie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

const KEY = 'favorite'

export function getFavorites(): FavoriteMovie[] {
  const raw = localStorage.getItem(KEY)
  return raw ? JSON.parse(raw) : []
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((m) => m.imdbID === id)
}

export function toggleFavorite(movie: FavoriteMovie): void {
  const favorites = getFavorites()
  const exists = favorites.some((m) => m.imdbID === movie.imdbID)

  const updated = exists
    ? favorites.filter((m) => m.imdbID !== movie.imdbID)
    : [...favorites, movie]

  localStorage.setItem(KEY, JSON.stringify(updated))
}