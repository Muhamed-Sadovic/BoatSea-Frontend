import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./VerificationPage.css";

function VerificationPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code.trim()) {
      setMessage("❌ Please enter the code before submitting.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `https://localhost:7087/api/User/verifyAccount/${id}`,
        JSON.stringify({ code }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setMessage("✅ Successful verification! You can sign in now.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("❌ Wrong code, try again!");
      console.error("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verificationContainer">
      <h2>You have successfully registered!</h2>
      <p>Please enter the code you received by e-mail.</p>

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Verification code:</strong>
        </label>
        <input
          type="text"
          placeholder="Enter code..."
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verify..." : "Confirm"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default VerificationPage;
