import React, { useState } from "react";
import axios from "axios";
import "./ForgotPassword.css";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("https://localhost:7087/api/User/forgotPassword", { email });
      const resetToken = response.data.resetToken;
      setMessage("✅ Good job. You can now change your password.");

      setTimeout(() => {
        navigate(`/reset-password/${resetToken}`);
      }, 2000);
    } catch (error) {
      setMessage("❌ Error sending reset email. Please try again.");
      console.error("Error: ", error);
    }
  };

  return (
    <div className="forgotPassContainer">
      <h1>Forgot Password</h1>
      <p>Enter your email below and we will send you a password reset link.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <AiOutlineMail className="icon" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {message && <p className="message">{message}</p>}
    
        <button type="submit">Get Reset Token</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
