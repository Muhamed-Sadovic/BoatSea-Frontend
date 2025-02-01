import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineCamera,
} from "react-icons/ai";
import "./RegisterPage.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0]?.name || "");
  };

  const registerUserHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword || !file) {
      setError("⚠ Please fill in all fields!");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("⚠ Invalid email format!");
      return;
    }

    if (password.length < 6) {
      setError("⚠ Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      setError("⚠ Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("ImageName", fileName);
    formData.append("Image", file);
    formData.append("Role", "User");

    try {
      const response = await axios.post(
        "https://localhost:7087/api/User/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const id = response.data.user.id;
      navigate(`/verifyAccount/${id}`);
    } catch (e) {
      setError("❌ This account already exists or an error occurred.");
    }
  };

  return (
    <div className="registerContainer">
      <h1>Create Account</h1>
      <form onSubmit={registerUserHandler}>
        <div className="input-group">
          <AiOutlineUser className="icon" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <AiOutlineMail className="icon" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <AiOutlineLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <AiOutlineLock className="icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group file-upload">
          <AiOutlineCamera className="icon" />
          <input type="file" onChange={handleImageChange} required />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit">Sign Up</button>
      </form>

      <p>Already have an account?</p>
      <Link to="/login" className="login-link">
        Login
      </Link>
    </div>
  );
}

export default Register;
