import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PrivateRoute from './PrivateRoute';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link> |{' '}
        <Link to="/profile">Mi Perfil</Link>
        {isAuthenticated ? (
          <button onClick={handleLogout}>Cerrar Sesión</button>
        ) : (
          <button onClick={handleLogin}>Iniciar Sesión</button>
        )}
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Ruta protegida */}
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;