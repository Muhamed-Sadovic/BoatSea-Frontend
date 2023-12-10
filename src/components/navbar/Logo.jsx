import { Link } from "react-router-dom";
import "./Logo.css";

function Logo() {
  return (
    <Link to="/" className="logo">
      <img
        src="assets/logoBoat.png"
        alt="Boat logo"
        className="logo"
        width="200px"
        height="100px"
      />
      <h3>
        <span>B</span>oat<span>S</span>ea
      </h3>
    </Link>
  );
}

export default Logo;
