import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", inputs, {
        withCredentials: true,
      });
      localStorage.setItem('user', JSON.stringify(res.data.id));
      navigate("/");
    } catch (err: any) {
      setErr(err.response);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        {err && err}
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
