import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const { year, season } = GetSeason();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${search}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Anime Data</Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/top-anime">Top Anime</Link></li>
        <li><Link to="/genres">By Genres</Link></li>
        <li><Link to={`/seasonal/${year}/${season}`}>Seasonal</Link></li>
        {user ? (
            <>
              <li>Welcome, {user}!</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
      </ul>

      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search Anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
    </nav>
  );
}

function GetSeason(){
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  let season = "winter";
  if (currentMonth >= 3 && currentMonth < 6) season = "spring";
  if (currentMonth >= 6 && currentMonth < 9) season = "summer";
  if (currentMonth >= 9) season = "fall";

  return { year: currentYear, season };
}

export default Header;
