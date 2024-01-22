import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import "./Payment.css";
function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    alert("Transakcija je uspešno završena!");

    // Opciono: Obrada ID sesije iz URL-a ako je potrebno
    //const sessionId = new URLSearchParams(location.search).get('sessionId');
    navigate("/boats");
  }, [navigate]);

  return (
    <div className="paymentContainer">
      <h1>Plaćanje je uspešno.</h1>
    </div>
  );
}

export default Payment;
