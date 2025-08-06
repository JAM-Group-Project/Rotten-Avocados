import React from 'react';
import './Favorites.css';

function Favorites({ favorites, onRemoveFavorite }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <h2>Your Favorites</h2>
        <div className="no-favorites">
          <p>No favorites yet! Click the heart icon on movies or shows to add them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2>Your Favorites ({favorites.length})</h2>
      <div className="favorites-grid">
        {favorites.map((item) => (
          <div key={`${item.type}-${item.id}`} className={item.type === 'movie' ? 'movie-card' : 'show-card'}>
            <button
              className="favorite-heart favorited"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemoveFavorite(item.id, item.type);
              }}
              title="Remove from favorites"
            >
              ♥
            </button>
            <img
              src={
                item.poster_path || item.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Image'
              }
              alt={item.title || item.name}
              className={item.type === 'movie' ? 'movie-poster' : 'show-poster'}
            />
            <div className={item.type === 'movie' ? 'movie-info' : 'show-info'}>
              <h3 className={item.type === 'movie' ? 'movie-title' : 'show-title'}>
                {item.title || item.name}
              </h3>
              <p className={item.type === 'movie' ? 'movie-overview' : 'show-overview'}>
                {item.overview}
              </p>
              <div className={item.type === 'movie' ? 'movie-rating' : 'show-rating'}>
                <span className="rating-star">★</span>
                {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
              </div>
              <div className="item-type">
                <span className="type-badge">{item.type === 'movie' ? 'Movie' : 'TV Show'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
