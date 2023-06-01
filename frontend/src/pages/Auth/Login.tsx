import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        {err && <div>{err}</div>}
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;