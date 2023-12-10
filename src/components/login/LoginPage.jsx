import React from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data.success === true) {
          navigate("/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/forgot-password">Forgot password?</Link>
        <p style={{ marginBottom: "0" }}>Don't have an account?</p>
        <Link to="/register">Sign Up</Link>
      </div>
    </>
  );
}

export default Login;
