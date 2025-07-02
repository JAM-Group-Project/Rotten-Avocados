import './AboutUs.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Movie from './Movies';

function Shows() {
    return (
        <div className="shows-page">
            <h2>Shows</h2>
            <p>Shows section is under construction!</p>
        </div>
    );
}

function Title({ searchTerm, handleSearchChange }) {
    return (
        <div className="home-header">
            <h1 className="logo">Rotten Avocado</h1>
            <input
                className="search-bar"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </div>
    );
}

function AboutUs() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    return (
        <div>
            <Router>
                <div className="Home">
                    {/* Navigation Bar */}
                    <div className="topnav-links">
                        <Link className="active" to="/">Home</Link>
                        <Link to="/movies">Movies</Link>
                        <Link to="/shows">Shows</Link>
                    </div>
                    {/* Routes */}
                    <Routes>
                        <Route
                            path="/"
                            element={<Title searchTerm={searchTerm} handleSearchChange={handleSearchChange} />}
                        />
                        <Route path="/movies" element={<Movie searchTerm={searchTerm} />} />
                        <Route path="/shows" element={<Shows />} />
                    </Routes>
                </div>
            </Router>

            <div className="AboutUS">
                <div className="Who">
                    <h2>
                        Who we are:
                    </h2>
                    <p>
                        We are JAM, a team of three intrested in devloping our programming skills for front end and back end.
                        We created this website in order to undertsand more about java script, react, as well as,
                        additional languages, libraries, and tools needed along the way.
                    </p>
                </div>
                <div className="People">
                    <h3>
                        Joseph
                    </h3>
                    <p>
                        A student at JMU, interested in machine learning.
                    </p>
                    <h3>
                        Alex
                    </h3>
                    <p>
                        A student at JMU, interested in game development.
                    </p>
                    <h3>
                        Micah
                    </h3>
                    <p>
                        A student at JMU, interested in software engineering.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;