import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string[]>([]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user._id));
        navigate("/"); // Redirect to the home page
        window.location.reload(); // Refresh the page
      } else {
        const errorData = await response.json();
        setValidationError(errorData[0].msg);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };
  const navigate = useNavigate();

  return (
    <div>
      <h1>Login</h1>
      <div>
        {validationError && <h3>{validationError}</h3>}
        <h3></h3>
      </div>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}

export default LoginPage;
