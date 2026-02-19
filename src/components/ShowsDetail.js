import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ShowsDetail.css";

function ShowDetail() {
  const { id } = useParams();
  const API_KEY = "6bff30742e46b5d624e5b0376351ba35";

  const [show, setShow] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    // TV show details
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => setShow(data));

    // TV show cast
    fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setCast(data.cast?.slice(0, 8) || []));

    // TV show trailers
    fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const youtubeTrailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        setTrailer(youtubeTrailer);
      });
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <h2>{show.name}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
        alt={show.name}
      />
      <p>
        <strong>First Air Date:</strong> {show.first_air_date}
      </p>
      <p>
        <strong>Rating:</strong> {show.vote_average.toFixed(1)}
      </p>
      <p>
        <strong>Overview:</strong> {show.overview}
      </p>

      {trailer && (
        <div className="movie-trailer">
          <h3>Trailer</h3>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      )}

      {cast.length > 0 && (
        <div className="movie-cast">
          <h3>Top Cast</h3>
          <div className="cast-grid">
            {cast.map((actor) => (
              <div key={actor.cast_id || actor.credit_id} className="cast-member">
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : "https://via.placeholder.com/100x150?text=No+Image"
                  }
                  alt={actor.name}
                />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowDetail;
