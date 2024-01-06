import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import axios from "axios";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const registerUserHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7087/api/User/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      navigate("/login");
    } catch (e) {
      console.log("errpr" + e);
    }
  };

  return (
    <>
      <div className="registerContainer">
        <h1>Register</h1>
        <form onSubmit={registerUserHandler}>
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
