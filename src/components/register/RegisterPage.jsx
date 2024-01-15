import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState(null);
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const registerUserHandler = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (name.trim().length === 0) {
      setNameErrorMessage("Please enter name!");
      isValid = false;
      return;
    } else {
      setNameErrorMessage(null);
    }

    if (email.length === 0) {
      setEmailErrorMessage("Please enter email!");
      isValid = false;
      return;
    } else if (!emailRegex.test(email)) {
      setEmailErrorMessage("Invalid email, try again!");
      isValid = false;
      return;
    } else {
      setEmailErrorMessage(null);
    }

    if (password.trim().length === 0) {
      setPasswordErrorMessage("Please enter password!");
      isValid = false;
      return;
    } else if (password.trim().length < 4) {
      setPasswordErrorMessage("Password needs minimum 6 characters!");
      isValid = false;
      return;
    } else {
      setPasswordErrorMessage(null);
    }

    if (confirmPassword.trim().length === 0) {
      setConfirmPasswordErrorMessage("Please confirm password!");
      isValid = false;
      return;
    } else {
      setConfirmPasswordErrorMessage(null);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordErrorMessage("Passwords didn't match, try again!");
      isValid = false;
      return;
    } else {
      setConfirmPasswordErrorMessage(null);
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7087/api/User/register",
        {
          name,
          email,
          password,
        }
      );

      setName("");
      setEmail("");
      setPassword("");
      setNameErrorMessage("");
      setEmailErrorMessage("");
      setPasswordErrorMessage("");

      console.log(response.data);
      navigate("/login");
    } catch (e) {
      console.log("errpr" + e);
    }
  };

  return (
    <>
      <div className="registerContainer">
        <h1>Register</h1>
        <form onSubmit={registerUserHandler}>
          <label>
            <strong>Name</strong>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          {nameErrorMessage && <p>{nameErrorMessage}</p>}
          <label>
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            autoComplete="off"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailErrorMessage && <p>{emailErrorMessage}</p>}
          <label>
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
          <label>
            <strong>Confirm Password</strong>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordErrorMessage && <p>{confirmPasswordErrorMessage}</p>}
          <button type="submit">Register</button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login">Sign In</Link>
      </div>
    </>
  );
}

export default Register;
