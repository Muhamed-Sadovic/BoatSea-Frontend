import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="footer-item">
        <h3>About us</h3>
        <p>
          At BoatSea, we are passionate about providing unparalleled yacht
          charter experiences. With a commitment to excellence, we strive to
          make every voyage a memorable journey filled with luxury, adventure,
          and the joy of the open sea.
        </p>
      </div>
      <div className="footer-item">
        <h3>YOU CAN TRUST US</h3>
        <p>
          BoatSea is the leader in peer-to-peer yacht charters.Find a yacht to
          charter at a very low price, or offer your yacht for charter and earn
          extra income. BoatSea offers you the chance to charter yachts,
          sailboats, motorboats, RIBs, barges, catamarans and jet skis near me
          or around the world. Choose your type of boat, duration of charter
          period and contact the owner directly through our platform.
        </p>
      </div>

      <div className="footer-item">
        <h3>FOLLOW US</h3>
        <div className="icons">
          <p className="icon-hover">{<FaFacebook />}</p>
          <p className="icon-hover">{<FaInstagram />}</p>
          <p className="icon-hover">{<FaTwitterSquare />}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
