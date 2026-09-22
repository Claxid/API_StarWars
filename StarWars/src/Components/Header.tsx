import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-inner">
        <Link to="/" className="home-link">
          <button type="button" className="home-button">Home</button>
        </Link>
      </div>
    </header>
  )
}
