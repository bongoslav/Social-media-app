import { useLocation } from "react-router-dom";
import "./Error.css";

function ErrorPage() {
  const location = useLocation();

  return (
    <div className="error-container">
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-message">
        The requested URL <span className="error-url">{location.pathname}</span>{" "}
        was not found.
      </p>
    </div>
  );
}

export default ErrorPage;
