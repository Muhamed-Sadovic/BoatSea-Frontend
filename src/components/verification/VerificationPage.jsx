import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./VerificationPage.css";
import axios from "axios";

function VerificationPage() {
  const [code, setCode] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(code);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://localhost:7087/api/User/verifyAccount/${id}`,
        JSON.stringify({ code: code }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Uspesna verifikacija");
      navigate("/login");
    } catch (e) {
      alert("Pogresan kod, pokusajte ponovo!")
      console.error("ad,nv nasd" + e);
    }
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
