import React, { useState } from "react";
import './global.css'



const Movie = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  const api = '4a44b7cc';

  const search = async () => {
    if (!query) return;

    try {
      const response = await fetch (`http://www.omdbapi.com/?t=${query}&apikey=${api}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovie(data);
        setError('');
      } else {
        setError(data.Error)
        setMovie(null)
      }
    } catch (err) {
      setError('error');
      setMovie(null);
    }

  };


  return (

    <div className="movie">
      <h1>Busca la pelicula amigo Cami 📽🍿 </h1>


      <div>
        <input
          type="text"
          placeholder="Nombre de la pelicula"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="button">
        <button onClick={search}>Buscar </button>
      </div>
      {error && <p>{error}</p>}
      {movie && (
        <div>
          <h2>{movie.Title}</h2>
          <p>{movie.Plot}</p>
          {movie.Poster !== "N/A" && (
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
          )}
        </div>
      )}
    </div>
    
    
  )
}
export default Movie;