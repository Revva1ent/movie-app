import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isFavorite, toggleFavorite, type FavoriteMovie } from '../favorite'

function MoviePage() {
  const { id } = useParams()
  const [movie, setMovie] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fav, setFav] = useState(false)

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_OMDB_APIKEY

    setLoading(true)
    setError(null)

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === 'False') {
          setError(data.Error || 'Фильм не найден')
        } else {
          setMovie(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Ошибка загрузки')
        setLoading(false)
      })
  }, [id])

  useEffect(() => {
    if (movie) {
      setFav(isFavorite(movie.imdbID))
    }
  }, [movie])

  function handleToggleFavorite() {
    if (!movie) return

    const favMovie: FavoriteMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
    }

    toggleFavorite(favMovie)
    setFav(isFavorite(movie.imdbID))
  }

  if (loading) return <p>Загрузка...</p>
  if (error) return <p>{error}</p>
  if (!movie) return <p>Фильм не найден</p>

  return (
    <div className="movie-page">
      <Link to="/" className="back-link">← Назад к поиску фильмов</Link>

      <h1>{movie.Title}</h1>
      <button onClick={handleToggleFavorite} className="fav-btn">
        {fav ? '★ Убрать из избранного' : '☆ В избранное'}
      </button>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Год:</strong> {movie.Year}</p>
      <p><strong>Жанр:</strong> {movie.Genre}</p>
      <p><strong>Режиссёр:</strong> {movie.Director}</p>
      <p><strong>Актёры:</strong> {movie.Actors}</p>
      <p><strong>Описание:</strong> {movie.Plot}</p>
    </div>
  )
}

export default MoviePage