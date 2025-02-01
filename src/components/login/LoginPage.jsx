import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Dodate ikonice
import "./LoginPage.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [error, setError] = useState(null);
  const { setUserFunction } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginUserHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (email.length === 0) {
      setEmailErrorMessage("⚠ Please enter your email!");
      return;
    } else {
      setEmailErrorMessage(null);
    }

    if (password.trim().length === 0) {
      setPasswordErrorMessage("⚠ Please enter your password!");
      return;
    } else {
      setPasswordErrorMessage(null);
    }

    try {
      const response = await axios.post(
        "https://localhost:7087/api/User/login",
        {
          email: email,
          password: password,
        }
      );

      const responseData = response.data;
      const role = responseData.user.role;

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.token}`;
      setUserFunction(responseData);
      localStorage.setItem("user", JSON.stringify(responseData));

      setEmail("");
      setPassword("");

      role === "Admin" ? navigate("/adminpanel") : navigate("/profile");
    } catch (error) {
      setError("❌ Invalid email or password. Try again.");
    }
  };

  return (
    <div className="loginContainer">
      <h1>Login</h1>
      <form onSubmit={loginUserHandler}>
        <div className="input-group">
          <AiOutlineMail className="icon" />
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {emailErrorMessage && (
          <p className="error-message">{emailErrorMessage}</p>
        )}

        <div className="input-group">
          <AiOutlineLock className="icon" />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {passwordErrorMessage && (
          <p className="error-message">{passwordErrorMessage}</p>
        )}

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Login</button>
      </form>

      <Link to="/forgot-password" className="forgot-link">
        Forgot password?
      </Link>
      <p>Don't have an account?</p>
      <Link to="/register" className="register-link">
        Sign Up
      </Link>
    </div>
  );
}

export default Login;
