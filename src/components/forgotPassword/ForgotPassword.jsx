import React from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/forgot-password", { email })
      .then((result) => {
        console.log(result);
        if (result.data.success === true) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="loginContainer">
        <h1>Please provide your email</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
