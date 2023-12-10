import React from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import axios from "axios";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/register", { name, email, password })
      .then((result) => {
        console.log(result);
        const userId = result.data._id;
        // const token = result.data.token;
        //console.log(userId);
        navigate(`/verification/${userId}`);
        //localStorage.setItem("jwtToken", token);
      })
      .catch((err) => console.log(err + "error"));
  };

  return (
    <>
      <div className="registerContainer">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label>
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login">Sign In</Link>
      </div>
    </>
  );
}

export default Register;
