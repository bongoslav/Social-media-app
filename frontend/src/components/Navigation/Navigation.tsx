import { Link } from "react-router-dom";
import { logoutUser } from "../../services/authServices";
import "./Navigation.css";

function Navigation() {
  const isAuthenticated = localStorage.getItem("user");
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo">
        Social media app
      </Link>
      <nav>
        <div className="navbar-item">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="navbar-item">
                Profile
              </Link>
              <button className="navbar-item" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-item">
                Login
              </Link>
              <Link to="/register" className="navbar-item">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
