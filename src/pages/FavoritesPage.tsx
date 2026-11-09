import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getFavorites, toggleFavorite, type FavoriteMovie } from '../favorite'

function FavoritesPage() {
    const [favorites, setFavorites] = useState<FavoriteMovie[]>([])
    useEffect(() => {
        const loaded = getFavorites()
        setFavorites(loaded)
    }, [])

    function handleRemove(id: string) {
        const movie = favorites.find((m) => m.imdbID === id)
        if (movie) {
            toggleFavorite(movie)
            setFavorites(getFavorites())
        }
    }

    if (favorites.length === 0) {
        return (
            <div className="favorites-page">
                <Link to="/" className="back-link">← Назад к поиску</Link>
                <h1>Избранное</h1>
                <p>Пока пусто. Добавь фильмы со страницы фильма.</p>
            </div>
        )
    }

    return (
        <div className="favorites-page">
            <Link to="/" className="back-link">← Назад к поиску</Link>
            <h1>Избранное</h1>

            <div className="movies-grid">
                {favorites.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <Link to={`/movie/${movie.imdbID}`}>
                            <img
                                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/150x225?text=No+Poster'}
                                alt={movie.Title}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://placehold.co/300x450?text=No+Poster'
                                }}
                            />
                            <h3>{movie.Title}</h3>
                            <p>{movie.Year}</p>
                        </Link>
                        <button onClick={() => handleRemove(movie.imdbID)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default FavoritesPage