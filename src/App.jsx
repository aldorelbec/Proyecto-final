import React, { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { moviesArraySchema } from './schemas/movieSchema';
import './App.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovies = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
      }

      const data = await response.json();

      const validatedData = moviesArraySchema.parse(data);

      setMovies(validatedData.results);
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        console.error('Error de validación:', err.issues);
        setError('Los datos recibidos no tienen el formato esperado.');
      } else {
        console.error('Error:', err.message);
        setError(`Ocurrió un error: ${err.message}`);
      }
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="App">
      <h1>Explorador de Películas</h1>
       <h2>Películas Populares</h2 >
      {loading && <p>Cargando películas...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="movie-grid">
         
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image+Available'
                }
                alt={movie.title}
                className="movie-poster"
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;