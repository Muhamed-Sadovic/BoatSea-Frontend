import React from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./VerificationPage.css";
import axios from "axios";

function VerificationPage() {
  const [code, setCode] = useState();
  const navigate = useNavigate();
  const { userId } = useParams();
  //const jwtToken = localStorage.getItem("jwtToken");
  //console.log(userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3001/verification/${userId}`, { code, userId })
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err + "afkjafj"));
  };

  return (
    <>
      <div className="verificationContainer">
        <h2>Please enter the code from gmail</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <strong>Code</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Code"
            autoComplete="off"
            name="code"
            onChange={(e) => setCode(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default VerificationPage;
