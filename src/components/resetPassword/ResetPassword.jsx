import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLock } from "react-icons/ai";
import axios from "axios";
import "./ResetPassword.css";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrorMessage("");

    if (password.length < 6) {
      setPasswordErrorMessage("🔴 Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordErrorMessage("🔴 Passwords do not match!");
      return;
    }

    try {
      await axios.post(
        `https://localhost:7087/api/User/resetPassword/`,
        {
          token: token,
          newPassword: password,
        }
      );
      alert("✅ Your password has been successfully changed.");
      navigate("/login");
    } catch (error) {
      console.error("Error: ", error);
      setPasswordErrorMessage("❌ Something went wrong. Try again!");
    }
  };

  return (
    <div className="resetPassContainer">
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <AiOutlineLock className="icon" />
          <input
            type="password"
            placeholder="New password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <AiOutlineLock className="icon" />
          <input
            type="password"
            placeholder="Confirm new password"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {passwordErrorMessage && (
          <p className="error-message">{passwordErrorMessage}</p>
        )}

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
