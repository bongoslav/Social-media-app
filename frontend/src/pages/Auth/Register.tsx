import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      const errMsg: string = err.response.data[0].msg;
      setErr(errMsg);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />
        {err && <p>{err}</p>}
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
