import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import "./Payment.css";
function Payment() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const userId = decodeURIComponent(queryParams.get("userId"));
    const boatId = decodeURIComponent(queryParams.get("boatId"));
    const startDate = new Date(
      decodeURIComponent(queryParams.get("startDate"))
    );
    const endDate = new Date(decodeURIComponent(queryParams.get("endDate")));
    if (userId && boatId && startDate && endDate) {
      Rent(userId, boatId, startDate, endDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function Rent(userId, boatId, startDate, endDate) {
    try {
      const response = await axios.post(
        "https://muhamedsadovic-001-site1.ftempurl.com/api/Rent/RentBoat",
        {
          userId,
          boatId,
          datumIznajmljivanja: startDate,
          datumKrajaIznajmljivanja: endDate,
        }
      );
      if (response.status === 200 || response.status === 201) {
        const updateBoatResponse = await axios.put(
          `https://muhamedsadovic-001-site1.ftempurl.com/api/Boat/updateAvailable/${boatId}`,
          {
            available: false,
          }
        );

        console.log(updateBoatResponse);
      }
      alert("Rent successfully initiated!");
      navigate("/boats");
    } catch (error) {
      console.error("Error in renting the boat:", error);
    }
  }

  return (
    <div className="paymentContainer">
      <h1>Payment is successful.</h1>
    </div>
  );
}

export default Payment;
