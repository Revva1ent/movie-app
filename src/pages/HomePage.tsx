import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Movie {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

function HomePage() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim() === '') return

    setLoading(true)
    setError(null)
    setMovies([])

    const API_KEY = import.meta.env.VITE_OMDB_APIKEY

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      )
      const data = await res.json()

      if (data.Response === 'False') {
        setError(data.Error || 'Ничего не найдено')
      } else {
        setMovies(data.Search)
      }
    } catch {
      setError('Ошибка запроса')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home-page">
      <h1>Поиск фильмов</h1>
      <Link to="/favorite">★ Избранное</Link>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название фильма..."
        />
        <button type="submit">Найти</button>
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomePage