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
  const [imageErrorMessage, setImageErrorMessage] = useState(null);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const PromenaSlike = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  // const handleSelectChange = (event) => {
  //   setRole(event.target.value);
  // };

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
    } else if (password.trim().length < 6) {
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

    if (!file) {
      setImageErrorMessage("Please upload an image");
      isValid = false;
      return;
    } else {
      setImageErrorMessage(null);
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
    setRole("User");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("ImageName", fileName);
    formData.append("Image", file);
    formData.append("Role", role);

    try {
      const response = await axios.post(
        "https://localhost:7087/api/User/register",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const id = response.data.user.id;
      //const role = response.data.user.role;

      setName("");
      setEmail("");
      setPassword("");
      setNameErrorMessage("");
      setEmailErrorMessage("");
      setPasswordErrorMessage("");
      // if (role === "Admin") {
      //   alert("Uspesno ste kreirali nalog kao admin!")
      //   navigate("/login");
      // } else {
      //   navigate(`/verifyAccount/${id}`);
      // }
      navigate(`/verifyAccount/${id}`);
    } catch (e) {
      console.log("error" + e);
      if (e.response) {
        if (e.response.status === 404) {
          alert("This account already exists, try with another one!");
        } else if (e.response.status === 400) {
          alert("This account already exists, try with another one!");
        }
      }
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
          <label>
            <strong>Select Image</strong>
          </label>
          <input type="file" id="image" name="image" onChange={PromenaSlike} />
          {imageErrorMessage && <p>{imageErrorMessage}</p>}
          {/* <label>
            <strong>Role</strong>
          </label> */}
          {/* <select name="type" value={role} onChange={handleSelectChange}>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select> */}
          <button type="submit">Register</button>
        </form>
        <p>Already Have an Account</p>
        <Link to="/login">Sign In</Link>
      </div>
    </>
  );
}

export default Register;
