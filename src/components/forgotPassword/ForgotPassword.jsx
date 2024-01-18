import React from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:7087/api/User/forgotPassword", {
        email,
      });
      alert("Link za resetovanje lozinke je poslat na vaš email.");
    } catch (error) {
      console.error("Greška: ", error);
    }
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
