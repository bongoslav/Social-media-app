import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function LoginPage() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
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
      sessionStorage.setItem("user", JSON.stringify(res.data.id));
      navigate("/");
      window.location.reload();
    } catch (err: any) {
      const errMsg: string = err.response.data.msg;
      setErr(errMsg);
    }
  };

  return (
    <div className="login-container">
      <form>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <button className="btn-login" onClick={handleLogin}>
          Login
        </button>
        {err && <div className="err-msg">{err}</div>}
      </form>
    </div>
  );
}

export default LoginPage;
