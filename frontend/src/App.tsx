import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navigation from "./components/NavigationBar/Navigation";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
