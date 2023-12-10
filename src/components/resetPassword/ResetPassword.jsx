import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

function ResetPassword() {
  const [password, setPassword] = useState();
  const [invalidUser, setInvalidUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //const {token, id} = queryString.parse(location.search)

  const verifyToken = async () => {
    try {
      const { token, id } = queryString.parse(location.search);
      const { data } = await axios(
        `http://localhost:3001/verify-token?token=${token}&id=${id}`
      );
      if (!data.success) return setInvalidUser(data.error);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/forgot-password", { password })
      .then((result) => {
        console.log(result);
        if (result.data.success === true) {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
