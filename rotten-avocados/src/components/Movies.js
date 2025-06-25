import React, { useEffect, useState } from 'react';
import './Movies.css';

function Movie({ searchTerm }) {
  const API_KEY = "6bff30742e46b5d624e5b0376351ba35";
  const [movieList, setMovieList] = useState([]);


  const TrendingMovies = () => {
    fetch (`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(json => setMovieList(json.results || []));
  }

  const searchMovies = (query) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`)
      .then(res => res.json())
      .then(json => setMovieList(json.results || []));
  };



  useEffect(() => {
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    } else {
      TrendingMovies();
    }
  }, [searchTerm]);

  return (
    <div className="movies-container">
      <div className="movies-grid">
        {movieList.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img 
              className="movie-poster"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-overview">{movie.overview}</p>
              <div className="movie-rating">
                <span className="rating-star">⭐</span>
                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie;