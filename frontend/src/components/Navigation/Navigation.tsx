import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../services/authServices";
import "./Navigation.css";

function Navigation() {
  const isAuthenticated = sessionStorage.getItem("user");
  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav>
      <Link to="/" className="navbar-logo">
        Social media app
      </Link>
      <div className="header-right">
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="navbar-item">
              Profile
            </NavLink>
            <button className="navbar-item" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar-item">
              Login
            </NavLink>
            <NavLink to="/register" className="navbar-item">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
