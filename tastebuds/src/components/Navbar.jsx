import { Link } from 'react-router-dom'
import './Navbar.css'
export default function Navbar({ favoritesCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">🍔 TasteBuds</Link>
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/add" className="add-btn">➕ Add Recipe</Link>
        <Link to="/favorites">❤️ Favorites ({favoritesCount})</Link>
      </div>
    </nav>
  )
}