import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../context/myContext";
import axios from "axios";
import "./LoginPage.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [error, setError] = useState(null);
  const { setUserFunction } = useContext(MyContext);
  const navigate = useNavigate();

  const loginUserHandler = async (e) => {
    e.preventDefault();
    let isValid = true;
    setError(null);

    if (email.length === 0) {
      setEmailErrorMessage("Please enter email!");
      isValid = false;
      return;
    } else {
      setEmailErrorMessage(null);
    }

    if (password.trim().length === 0) {
      setPasswordErrorMessage("Please enter password!");
      isValid = false;
      return;
    } else {
      setPasswordErrorMessage(null);
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        "https://muhamedsadovic-001-site1.ftempurl.com/api/User/login",
        {
          email: email,
          password: password,
        }
      );

      const responseData = response.data;
      console.log(responseData);
      const role = responseData.user.role;

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${responseData.token}`;

      setUserFunction(responseData);

      localStorage.setItem("user", JSON.stringify(responseData));
      setEmail("");
      setPassword("");
      if (role === "Admin") {
        navigate("/adminpanel");
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error", error);
      if (error.response) {
        if (error.response.status === 404) {
          setError("Invalid request. Check the entered data.");
        } else if (error.response.status === 400) {
          setError("Invalid request. Check the entered data.");
        } else {
          setError("A server error has occurred.");
        }
      } else {
        setError("Something went wrong. Please try again later");
      }
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
          {emailErrorMessage && <p>{emailErrorMessage}</p>}
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
          <button type="submit">Login</button>
        </form>
        <Link to="/forgot-password">Forgot password?</Link>
        <p style={{ marginBottom: "0" }}>Don't have an account?</p>
        <Link to="/register">Sign Up</Link>
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
      </div>
    </>
  );
}

export default Login;
