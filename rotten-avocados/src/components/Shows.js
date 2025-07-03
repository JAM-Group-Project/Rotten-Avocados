import React, { useEffect, useState } from 'react';
import './Shows.css';

function Show({ searchTerm }) {
    const API_KEY = "6bff30742e46b5d624e5b0376351ba35";
    const [showList, setShowList] = useState([]);

    const TrendingShows = () => {
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(json => setShowList(json.results || []));
    }
    // Alex: I'll modify this so that it will be implemented but I need a working redirect page first, as well as the search button for the differents pages
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

    const searchShows = (query) => {
        fetch(`https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmZmMzA3NDJlNDZiNWQ2MjRlNWIwMzc2MzUxYmEzNSIsIm5iZiI6MTc1MDI1NjYxMS4xMjIsInN1YiI6IjY4NTJjYmUzZjZiYzkxNGJiNWZiNTJiNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJCLdC161u5UYFrlZaE8Vk2w8aTmWBaiKoChuCEgjvw',
                'accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => setShowList(json.results || []));
    };

    useEffect(() => {
        if (searchTerm && searchTerm.trim()) {
            searchShows(searchTerm);
        } else {
            TrendingShows();
        }
    }, [searchTerm]);

    return (
        <div className="shows-container">
            <div className="shows-grid">
                {showList.map((show) => (
                    <div key={show.id} className="show-card">
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Show;