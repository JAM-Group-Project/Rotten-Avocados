import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Shows.css';

function Show({ searchTerm }) {
  const API_KEY = "6bff30742e46b5d624e5b0376351ba35";
  const [showList, setShowList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTrendingShows = (page = 1) => {
    fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&page=${page}`)
      .then(res => res.json())
      .then((json) => {
        setShowList(json.results || []);
        setTotalPages(json.total_pages || 1);
      });
  };

  const searchShows = (query, page = 1) => {
    fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmZmMzA3NDJlNDZiNWQ2MjRlNWIwMzc2MzUxYmEzNSIsIm5iZiI6MTc1MDI1NjYxMS4xMjIsInN1YiI6IjY4NTJjYmUzZjZiYzkxNGJiNWZiNTJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJCLdC161u5UYFrlZaE8Vk2w8aTmWBaiKoChuCEgjvw',
        'accept': 'application/json'
      }
    })
      .then(res => res.json())
      .then((json) => {
        setShowList(json.results || []);
        setTotalPages(json.total_pages || 1);
      });
  };

  useEffect(() => {
    if (searchTerm && searchTerm.trim()) {
      searchShows(searchTerm, currentPage);
    } else {
      fetchTrendingShows(currentPage);
    }
  }, [searchTerm, currentPage]);

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
    <div className="shows-container">
      <div className="shows-grid">
        {showList.map((show) => (
          <Link to={`/shows/${show.id}`} key={show.id} className="show-card">
            <img
              className="show-poster"
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
            />
            <div className="show-info">
              <h3 className="show-title">{show.name}</h3>
              <p className="show-overview">{show.overview}</p>
              <div className="show-rating">
                <span className="rating-star">⭐</span>
                {show.vote_average ? show.vote_average.toFixed(1) : 'N/A'}
              </div>
            </div>
          </Link>
        ))}
      </div>

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
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Show;
