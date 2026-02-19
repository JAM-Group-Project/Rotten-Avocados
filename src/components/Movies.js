import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Movies.css";

function Movie({ searchTerm, onAddFavorite, onRemoveFavorite, isFavorited }) {
  const API_KEY = "6bff30742e46b5d624e5b0376351ba35";
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch movies from discover endpoint
  const getMovie = (page = 1) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&include_adult=false`
    )
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results || []);
        setTotalPages(json.total_pages || 1);
      });
  };

  // Fetch movies from search endpoint
  const searchMovies = (query, page = 1) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&include_adult=false&language=en-US&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmZmMzA3NDJlNDZiNWQ2MjRlNWIwMzc2MzUxYmEzNSIsIm5iZiI6MTc1MDI1NjYxMS4xMjIsInN1YiI6IjY4NTJjYmUzZjZiYzkxNGJiNWZiNTJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJCLdC161u5UYFrlZaE8Vk2w8aTmWBaiKoChuCEgjvw",
          accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMovieList(json.results || []);
        setTotalPages(json.total_pages || 1);
      });
  };

  // Fetch data whenever page or searchTerm changes
  useEffect(() => {
    if (searchTerm && searchTerm.trim()) {
      searchMovies(searchTerm, currentPage);
    } else {
      getMovie(currentPage);
    }
  }, [searchTerm, currentPage]);

  // Generate a sliding window of page numbers
  const generatePageNumbers = () => {
    const totalButtons = 5;
    const pages = [];

    let start = Math.max(1, currentPage - Math.floor(totalButtons / 2));
    let end = start + totalButtons - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - totalButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="movies-container">
      <div className="movies-grid">
        {movieList.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <button
              className={`favorite-heart ${isFavorited && isFavorited(movie.id, 'movie') ? 'favorited' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isFavorited && isFavorited(movie.id, 'movie')) {
                  onRemoveFavorite && onRemoveFavorite(movie.id, 'movie');
                } else {
                  onAddFavorite && onAddFavorite(movie, 'movie');
                }
              }}
              title={isFavorited && isFavorited(movie.id, 'movie') ? 'Remove from favorites' : 'Add to favorites'}
            >
              ♥
            </button>
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
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination-buttons">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num)}
            className={currentPage === num ? "active" : ""}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Movie;