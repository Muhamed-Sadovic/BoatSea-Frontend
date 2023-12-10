import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "./Logo";

function Navbar() {
  return (
    <nav className="nav">
      <div className="left">
        <Logo />
      </div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
