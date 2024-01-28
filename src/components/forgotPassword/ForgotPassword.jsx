import React from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://muhamedsadovic-001-site1.ftempurl.com/api/User/forgotPassword", {
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
