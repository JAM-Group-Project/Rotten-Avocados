import './Home.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Movie from './Movies';
import MovieDetail from './MovieDetail'; // ✅ ADD THIS IMPORT

function Shows() {
  return (
    <div className="shows-page">
      <h2>Shows</h2>
      <p>Shows section is under construction!</p>
    </div>
  );
}

function Header({ searchTerm, handleSearchChange }) {
  return (
    <div className="header-container">
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <Link to="/" className="logo-link">
        <h1 className="logo">Rotten Avocado</h1>
      </Link>
    </div>
  );
}

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Router>
      <div className="Home">
        {/* Shared Header */}
        <Header searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

        {/* Navigation Bar */}
        <div className="topnav-links">
          <Link to="/movies">Movies</Link>
          <Link to="/shows">Shows</Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<div className="home-welcome"><h2>Welcome to Rotten Avocado!</h2></div>}
          />
          <Route path="/movies" element={<Movie searchTerm={searchTerm} />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/movie/:id" element={<MovieDetail />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
