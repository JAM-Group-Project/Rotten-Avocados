import './Home.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Movie from './Movies';
import AboutUs from './AboutUs';
import MovieDetail from './MovieDetail';
import Show from './Shows';
import ShowDetail from './ShowsDetail';

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

// 🧩 NEW: Homepage Content Component
function HomeContent() {
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [topShows, setTopShows] = useState([]);
  const [recentShows, setRecentShows] = useState([]);


  const API_KEY = "6bff30742e46b5d624e5b0376351ba35";

  useEffect(() => {
    // Top-rated movies
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(json => setTopMovies(json.results.slice(0, 5)));

    // Now playing (recent) movies
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(json => setRecentMovies(json.results.slice(0, 5)));

    // Now playing (recent) shows
    fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(json => setRecentShows(json.results.slice(0, 5)));

    // Top-rated shows
    fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(json => setTopShows(json.results.slice(0, 5)));
  }, []);

  return (
    <div className="home-sections">
      <Section title=" Recent Movies" items={recentMovies} isMovie />
      <Section title=" Recent Shows" items={recentShows} isMovie={false} />
      <Section title=" Top Rated Movies" items={topMovies} isMovie />
      <Section title=" Top Rated Shows" items={topShows} isMovie={false} />
    </div>
  );
}

//  NEW: Shared Grid Section Component
function Section({ title, items, isMovie }) {
  return (
    <>
      <h2 style={{ margin: "30px 0 15px" }}>{title}</h2>
      <div className={isMovie ? "movies-grid" : "shows-grid"}>
        {items.map(item => (
          <Link
            to={isMovie ? `/movie/${item.id}` : `/shows/${item.id}`}
            key={item.id}
            className={isMovie ? "movie-card" : "show-card"}
          >
            <img
              className={isMovie ? "movie-poster" : "show-poster"}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={isMovie ? item.title : item.name}
            />
            <div className={isMovie ? "movie-info" : "show-info"}>
              <h3 className={isMovie ? "movie-title" : "show-title"}>
                {isMovie ? item.title : item.name}
              </h3>
              <div className={isMovie ? "movie-rating" : "show-rating"}>
                ⭐ {item.vote_average?.toFixed(1)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
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
          <Link to="/AboutUs">AboutUs</Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/movies" element={<Movie searchTerm={searchTerm} />} />
          <Route path="/shows" element={<Show searchTerm={searchTerm} />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/shows/:id" element={<ShowDetail />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Home;
