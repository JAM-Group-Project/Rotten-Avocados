import React, { useEffect, useState } from 'react';
import './Movies.css';

function Movie({ searchTerm }) {
  const API_KEY = "6bff30742e46b5d624e5b0376351ba35";
  const [movieList, setMovieList] = useState([]);

  // const getMovie = () => {
  //   fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
  //     .then(res => res.json())
  //     .then(json => setMovieList(json.results));
  // };

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

  // API for shows trending:
  // curl --request GET \
  //    --url 'https://api.themoviedb.org/3/trending/tv/day?language=en-US' \
  //    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmZmMzA3NDJlNDZiNWQ2MjRlNWIwMzc2MzUxYmEzNSIsIm5iZiI6MTc1MDI1NjYxMS4xMjIsInN1YiI6IjY4NTJjYmUzZjZiYzkxNGJiNWZiNTJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJCLdC161u5UYFrlZaE8Vk2w8aTmWBaiKoChuCEgjvw' \
  //    --header 'accept: application/json'

  // API for shows search: 
  // curl --request GET \
  //    --url 'https://api.themoviedb.org/3/search/tv?include_adult=false&language=en-US&page=1' \
  //    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmZmMzA3NDJlNDZiNWQ2MjRlNWIwMzc2MzUxYmEzNSIsIm5iZiI6MTc1MDI1NjYxMS4xMjIsInN1YiI6IjY4NTJjYmUzZjZiYzkxNGJiNWZiNTJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJCLdC161u5UYFrlZaE8Vk2w8aTmWBaiKoChuCEgjvw' \
  //    --header 'accept: application/json'

  useEffect(() => {
    getMovie();
  }, []);

  // Filter movies based on the search term
  const filteredMovies = movieList.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movies-container">
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
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
                <span className="rating-star"></span>
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movie;
