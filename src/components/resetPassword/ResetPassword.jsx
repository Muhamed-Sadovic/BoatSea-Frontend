import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [invalidUser, setInvalidUser] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (password.trim().length === 0) {
      setPasswordErrorMessage("Please enter password!");
      isValid = false;
      return;
    } else {
      setPasswordErrorMessage(null);
    }

    if (confirmPassword.trim().length === 0) {
      setPasswordErrorMessage("Please confirm password!");
      isValid = false;
      return;
    } else {
      setPasswordErrorMessage(null);
    }

    if (password !== confirmPassword) {
      setPasswordErrorMessage("Passwords didn't match, try again!");
      isValid = false;
      return;
    } else {
      setPasswordErrorMessage(null);
    }

    if (!isValid) {
      return;
    }

    try {
      await axios.post(
        `https://localhost:7087/api/User/resetPassword/${token}`,
        {
          newPassword: password,
        }
      );
      alert("Vaša lozinka je uspešno promenjena.");
      navigate("/login")
      // Preusmeravanje na stranicu za prijavu ili početnu stranicu
    } catch (error) {
      console.error("Greška: ", error);
      // Obraditi grešku
    }
  };

  return (
    <>
      <div className="loginContainer">
        <h1>Please provide your new password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            autoComplete="off"
            name="email"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm new passwoed"
            autoComplete="off"
            name="email"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Change</button>
          {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
