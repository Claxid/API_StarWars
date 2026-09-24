import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="home-link">
          <button type="button" className="home-button">Home</button>
        </Link>

        <Link to="/characters" className="home-link">
          <button type="button" className="home-button">View Characters</button>
        </Link>

        

        <Link to="/add-character" className="home-link">
          <button type="button" className="home-button">Add Character</button>
        </Link>


        <Link to="/selection" className="home-link">
          <button type="button" className="home-button">My selection</button>
        </Link>
      </div>
    </header>
  );
}