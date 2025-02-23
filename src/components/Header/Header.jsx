import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const expirationCheck = () => {
      const now = Date.now();
      const expire = localStorage.getItem("expiresAt");

      if (!expire || now > Number(expire)) {
        console.log("Token Expired");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("expiresAt");
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(true);
      }
    };

    expirationCheck();
    const interval = setInterval(expirationCheck, 10000);

    return () => clearInterval(interval);
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");

    setIsAuthenticated(false);
    setUser(null);
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
        <li><Link to="/genres">Genres</Link></li>
        <li><Link to={`/seasonal/${year}/${season}`}>Seasonal</Link></li>
        {isAuthenticated ? (
          <>
            <li className="user">Welcome, {localStorage.getItem("user")}!</li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
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

function GetSeason() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  let season = "winter";
  if (currentMonth >= 3 && currentMonth < 6) season = "spring";
  if (currentMonth >= 6 && currentMonth < 9) season = "summer";
  if (currentMonth >= 9) season = "fall";

  return { year: currentYear, season };
}

export default Header;
