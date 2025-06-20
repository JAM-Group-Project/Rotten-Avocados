import './App.css';
import React, { useState } from 'react';
import Movie from './components/Movies';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      {/* Logo + Search Bar */}
      <div className="header-top">
        <h1 className="logo">Rotten Avocado</h1>
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Navigation Bar */}
      <div className="topnav">
        <a className="active" href="#home">Home</a>
        <a href="#Movies">Movies</a>
        <a href="#Shows">Shows</a>
      </div>

      {/* Sections */}
      <section id="Movies">
        <h2>Movies</h2>
        <Movie searchTerm={searchTerm} />
      </section>

      <section id="Shows">
        <h2>Shows</h2>
        <p>Coming soon...</p>
      </section>
    </div>
  );
}

export default App;
