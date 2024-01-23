import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../../context/myContext";
import { IoLogOutOutline } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const { user, setUserFunction } = useContext(MyContext);
  const navigate = useNavigate();
  const isAdmin = user && user.user.role === "Admin";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutUserHandler = () => {
    setUserFunction(null);
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="left">
        <Logo />
      </div>
      <div className="menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={isMenuOpen ? "open" : ""}>
        <li>
          <NavLink to="/" className="small-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="boats" className="small-link">
            Boats
          </NavLink>
        </li>
        {!user && (
          <li>
            <NavLink to="/register" className="small-link">
              Register
            </NavLink>
          </li>
        )}
        {!user && (
          <li>
            <NavLink to="/login" className="small-link">
              Login
            </NavLink>
          </li>
        )}
        {user && !isAdmin && (
          <li>
            <NavLink to="profile" className="small-link">
              Profile
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink to="/createboat" className="small-link">
              Create Boat
            </NavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <NavLink to="/adminpanel" className="small-link">
              Admin Panel
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <button className="logoutButton" onClick={logoutUserHandler}>
              <IoLogOutOutline />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
