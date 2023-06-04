import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function RegisterPage() {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/register",
        inputs
      );

      if (res.status !== 201) {
        const errors = res.data; // Assuming the server returns an array of validation errors
        console.log(errors);

        if (Array.isArray(errors)) {
          const errorMessages = errors.map((error) => error.msg);
          setErr(errorMessages.join(", "));
        } else {
          setErr("Registration failed"); // Set a generic error message if the response format is unexpected
        }
      } else {
        setErr("");
        navigate("/login");
      }
    } catch (err: any) {
      const errMsg: string = err.response.data.msg;
      setErr(errMsg);
    }
  };

  return (
    <div className="register-container">
      <form>
        <h1>Register</h1>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" onChange={handleChange} />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          onChange={handleChange}
        />
        <button className="btn-register" onClick={handleRegister}>
          Register
        </button>
        {err && <div className="err-msg">{err}</div>}
      </form>
    </div>
  );
}

export default RegisterPage;
