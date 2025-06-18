import './App.css';
import { NavLink } from "react-router";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello this is a test website for Rotten Avocado 
        </p>
        <a
          className="topnav"
          href="#home"
          aria-label="Rotten Avocado Home">
          {/* <span className="topnav-title">Rotten Avocado</span> */}
          <span className="topnav-links">
            <nav>
              <NavLink to="/Movies" className="topnav-links">Movies</NavLink>
              <NavLink to="/Shows" className="topnav-links">Shows</NavLink>
            </nav>
          </span>
        </a>
      </header>
    </div>
  );
}

export default App;