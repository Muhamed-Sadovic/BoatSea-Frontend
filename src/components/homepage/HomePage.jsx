import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="pageContainer">
      <div className="container">
        <h1>Welcome to BoatSea</h1>
        <h2>Your Best Yacht Charter Solution</h2>
        <p>
          Discover over <strong>10+ private yacht rentals</strong> and bareboat
          charters worldwide for your next boating adventure.
        </p>
        <p>
          BoatSea is the leader in peer-to-peer yacht charters. Find a yacht to
          charter at an unbeatable price, or offer your yacht and earn extra
          income.
        </p>
        {!user && (
          <>
            <p>Sign up now to start renting your dream yacht!</p>

            <div className="cta-buttons">
              <Link to="/register" className="btn register-btn">
                Register
              </Link>
              <Link to="/boats" className="btn explore-btn">
                Explore Boats
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="image-container">
        <h1>Our Luxury Boats</h1>
        <p>Explore our exclusive range of yachts available for charter:</p>
        <div className="image-grid">
          <img src="assets/yacht1.webp" alt="Luxury Yacht 1" />
          <img src="assets/yacht2.jpg" alt="Luxury Yacht 2" />
          <img src="assets/yacht3.jpg" alt="Luxury Yacht 3" />
          <img src="assets/yacht4.webp" alt="Luxury Yacht 4" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
