import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/myContext";
import DatePicker from "react-datepicker";
import { loadStripe } from "@stripe/stripe-js";
import "react-datepicker/dist/react-datepicker.css";
import "./BoatDetails.css";
const url = "https://localhost:7087/api/Boat/";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51ObHPNFPaUUOIdBrHGTk8Xb6xJGJyTO3tuQLs8XBMcSgKSJn485pNtMUpNekO1tkFiehbL1yjkkcNIvdOlWy62M600bzCgAd1J"
    );
  }
  return stripePromise;
};

function BoatDetails() {
  const { id } = useParams();
  const { user } = useContext(MyContext);
  const navigate = useNavigate();
  const [boat, setBoat] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    imageName: "",
    description: "",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // const item = {
  //   price: "price_1ObHctFPaUUOIdBrcktZ3Wfw",
  //   quantity: 1,
  // };

  // const checkoutOptions = {
  //   lineItems: [item],
  //   mode: "payment",
  //   successUrl: `${window.location.origin}/boats`,
  //   cancelUrl: `${window.location.origin}/boatDetails/${id}`,
  // };

  const redirectToCheckout = async () => {
    try {
      // Izračunajte ukupnu cenu na osnovu broja dana i cene po danu
      const daysRented = (endDate - startDate) / (1000 * 3600 * 24);
      const totalPrice = daysRented * boat.price;
      const startDateISO = new Date(startDate).toISOString();
      const endDateISO = new Date(endDate).toISOString();

      const encodedStartDate = encodeURIComponent(startDateISO);
      const encodedEndDate = encodeURIComponent(endDateISO);

      console.log("User id:", user.user.id);
      console.log("Boat id: ", id);

      const response = await axios.post(`${url}create-checkout-session`, {
        // Pošaljite potrebne informacije na backend, uključujući ukupnu cenu
        price: totalPrice,
        successUrl: `${window.location.origin}/payment?userId=${user.user.id}&boatId=${id}&startDate=${encodedStartDate}&endDate=${encodedEndDate}`,
        cancelUrl: `${window.location.origin}/boatDetails/${boat.id}`,
      });

      const { sessionId } = response.data;
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.log("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // const redirectToCheckout = async () => {
  //   const stripe = await getStripe();
  //   const { error } = await stripe.redirectToCheckout(checkoutOptions);
  //   console.log("stripe checkout error" + error);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}GetBoatById/${id}`);
        const responseData = response.data;
        setBoat(responseData);
      } catch (error) {
        console.error("Error fetching boat details:", error);
      }
    };

    fetchData();
  }, [id]);

  function handleDeleteBoat(id) {
    const isConfirmed = window.confirm(
      "Da li ste sigurni da želite da obrišete ovaj brod?"
    );
    if (isConfirmed) {
      try {
        axios.delete(`${url}deleteBoat/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        alert("Uspesno ste obrisali brod!");
        navigate("/boats");
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div className="boatDetailsContainer">
      <div>
        <img src={`https://localhost:7087/Images/${boat.imageName}`} alt="" />
      </div>
      <div className="details">
        <h1>Details</h1>
        <p>
          <span>Name:</span> {boat.name}
        </p>
        <p>
          <span>Boat type:</span> {boat.type}
        </p>
        <p>
          <span>Price:</span> {boat.price}$/ per day
        </p>
        <p>
          <span>Additional Information:</span> {boat.description}
        </p>
        <p className="dateForRent">
          <span>Choose the date for rent:</span>
        </p>
        <div className="picker">
          <div>
            <p>From</p>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
          <div>
            <p>To</p>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </div>
        </div>
        {user && user.user.role === "Admin" ? (
          <div className="dugmici">
            <Link to={`/editBoat/${boat.id}`} className="detailsButton">
              Edit
            </Link>
            <button id="crvena" onClick={() => handleDeleteBoat(boat.id)}>
              Delete
            </button>
          </div>
        ) : (
          <div className="dugmici">
            <button onClick={redirectToCheckout}>Rent</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoatDetails;
