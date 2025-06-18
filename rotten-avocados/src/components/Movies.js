import React, { useEffect, useState } from 'react'
import './Movies.css'

function Movie() {

  const API_KEY = "6bff30742e46b5d624e5b0376351ba35";

  const [movieList, setMovieList] = useState([])
  const getMovie = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(json => setMovieList(json.results))
  }

  useEffect(() => {
    getMovie()
  }, [])

  console.log(movieList)

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
                {movie.vote_average.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Movie