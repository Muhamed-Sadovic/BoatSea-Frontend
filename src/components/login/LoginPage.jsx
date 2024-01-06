import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../context/myContext";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUserFunction } = useContext(MyContext);
  const navigate = useNavigate();

  const loginUserHandler = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const response = await axios.post(
        "https://localhost:7087/api/User/login",
        {
          email: email,
          password: password,
        }
      );

      const responseData = response.data;

      console.log(responseData);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.token}`;

      setUserFunction(responseData);

      localStorage.setItem("user", JSON.stringify(responseData));
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (e) {
      console.log("Error", e);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="loginContainer">
        <h1>Login</h1>
        <form onSubmit={loginUserHandler}>
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
        {error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
          )}
      </div>
    </>
  );
}

export default Login;
