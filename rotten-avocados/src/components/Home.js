import './Home.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Movie from './Movies';
import Show from './Shows';

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
          <Route path="/shows" element={<Show searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
