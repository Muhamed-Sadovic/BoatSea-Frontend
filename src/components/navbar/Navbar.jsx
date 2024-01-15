import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Logo";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../context/myContext";

function Navbar() {
  const { user, setUserFunction } = useContext(MyContext);
  const navigate = useNavigate();
  const isAdmin = user && user.user.role === "Admin";

  const logoutUserHandler = () => {
    setUserFunction(null);
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
    navigate("/")
  };

  return (
    <nav className="nav">
      <div className="left">
        <Logo />
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        {!user && (
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
        {user && !isAdmin &&(
          <li><NavLink to="profile">Profile</NavLink></li>
        )}
        {isAdmin && (
          <li><NavLink to="/adminpanel">Admin Panel</NavLink></li>
        )}
        {user && (
          <li>
            <button onClick={logoutUserHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
