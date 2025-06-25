import './Home.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Movie from './Movies';

function Shows() {
  return (
    <div className="shows-page">
      <h2>Shows</h2>
      <p>Shows section is under construction!</p>
    </div>
  );
}

function Title({ searchTerm, handleSearchChange }) {
  return (
    <div className="home-header">
      <h1 className="logo">Rotten Avocado</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
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
        {/* Navigation Bar */}
        <div className="topnav-links">
          <Link className="active" to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/shows">Shows</Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<Title searchTerm={searchTerm} handleSearchChange={handleSearchChange} />}
          />
          <Route path="/movies" element={<Movie searchTerm={searchTerm} />} />
          <Route path="/shows" element={<Shows />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
