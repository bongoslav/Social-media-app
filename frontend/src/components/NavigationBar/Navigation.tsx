import { Link } from "react-router-dom";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { logoutUser } from "../../services/authServices";

const isLoggedIn = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("myApp_token="))
    ?.split("=")[1];

  // Return true if the authentication token is present, otherwise return false
  return !!token;
};

function Navigation() {
  const isAuthenticated = isLoggedIn();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Typography
            variant="h6"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Social media app
          </Typography>
        </Link>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <HomeIcon sx={{ display: { xs: "block", sm: "none" } }} />
        </Link>

        <Box sx={{ marginLeft: "auto" }}>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
