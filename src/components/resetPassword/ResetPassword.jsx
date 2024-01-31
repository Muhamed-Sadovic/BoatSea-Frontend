import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './ResetPassword.css'

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (password.trim().length === 0) {
      setPasswordErrorMessage("Please enter password!");
      isValid = false;
      return;
    } else if (password.trim().length < 6) {
      setPasswordErrorMessage("Password needs minimum 6 characters!");
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
      alert("Your password has been successfully changed.");
      navigate("/login");
    } catch (error) {
      console.error("Greška: ", error);
    }
  };

  return (
    <>
      <div className="resetPassContainer">
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
