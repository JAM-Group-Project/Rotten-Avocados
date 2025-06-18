import './App.css';

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
            <a href="#Movies">Movies</a>
            <a href="#shows">Shows</a>
          </span>
        </a>
      </header>
    </div>
  );
}

export default App;
