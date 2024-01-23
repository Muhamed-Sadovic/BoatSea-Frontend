import React from "react";
import "./HomePage.css";

function HomePage() {
  return (
    <div>
      <div className="pageContainer">
        <div className="container">
          <h1>Welcome on BoatSea</h1>
          <h2>The best solution for your yacht charter</h2>
          <p>
            More than 10+ private yacht rentals and bareboat charters near me
            and worldwide for your next boating trip
          </p>
          <p>Go to register page to rent a boat/yacht</p>
        </div>
        <div className="image-container">
          <h1>Our Boat Models</h1>
          <p>
            Explore our diverse range of luxury boat models available for
            charter:
          </p>
          <div>
            <img src="assets/yacht1.webp" alt="Boat Model 1" />
            <img src="assets/yacht2.jpg" alt="Boat Mwodel 2" />
          </div>
          <div>
            <img src="assets/yacht3.jpg" alt="Boat Model 3" />
            <img src="assets/yacht4.webp" alt="Boat Model 3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
