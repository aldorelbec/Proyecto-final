// src/App.jsx
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import { moviesArraySchema } from './schemas/movieSchema';
import './App.css';

// Obtén tu API Key de tu archivo .env
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.status}`);
        }

        const data = await response.json();

        // Validar los datos con Zod
        const validatedData = moviesArraySchema.parse(data);

        // Almacenar los datos si la validación es exitosa
        setMovies(validatedData.results);
        setError(null);

      } catch (err) {
        // Manejo de errores de Zod o de la red
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
    };

    fetchMovies();
  }, []);

  return (
    <div className="App">
      <h1>Explorador de Películas</h1>
      {loading && <p>Cargando películas...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div>
          <h2>Películas Populares</h2>
          <pre>{JSON.stringify(movies, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;