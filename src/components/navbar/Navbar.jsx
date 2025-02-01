import React, { useState, useContext,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa"; 
import Logo from "./Logo";
import axios from "axios";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUserFunction } = useContext(AuthContext);
  const isAdmin = user && user.user.role === "Admin";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const logoutUserHandler = () => {
    setUserFunction(null);
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="left">
          <Logo />
        </div>

        {/* Hamburger meni za mobilne uređaje */}
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigacija */}
        <ul className={isMenuOpen ? "nav-menu open" : "nav-menu"}>
          <li>
            <NavLink
              to="/"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/boats"
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Boats
            </NavLink>
          </li>
          {!user && (
            <>
              <li>
                <NavLink
                  to="/register"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
          {user && !isAdmin && (
            <li>
              <NavLink
                to="/profile"
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
            </li>
          )}
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/createboat"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create Boat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/adminpanel"
                  className="nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </NavLink>
              </li>
            </>
          )}
          {user && (
            <li>
              <button className="logoutButton" onClick={logoutUserHandler}>
                <IoLogOutOutline />
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
