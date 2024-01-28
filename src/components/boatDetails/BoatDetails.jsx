import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/myContext";
import { loadStripe } from "@stripe/stripe-js";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import "./BoatDetails.css";
const url = "https://muhamedsadovic-001-site1.ftempurl.com/api/Boat/";

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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [boat, setBoat] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    imageName: "",
    description: "",
  });

  const openModal = (imageName) => {
    setSelectedImage(imageName);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const redirectToCheckout = async () => {
    try {
      const daysRented = (endDate - startDate) / (1000 * 3600 * 24);
      const totalPrice = daysRented * boat.price;
      const startDateISO = new Date(startDate).toISOString();
      const endDateISO = new Date(endDate).toISOString();

      const encodedStartDate = encodeURIComponent(startDateISO);
      const encodedEndDate = encodeURIComponent(endDateISO);

      const response = await axios.post(`${url}create-checkout-session`, {
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
      "Are you sure you want to delete this ship?"
    );
    if (isConfirmed) {
      try {
        axios.delete(`${url}deleteBoat/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        alert("You have successfully deleted the ship!");
        navigate("/boats");
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div className="boatDetailsContainer">
      <img
        src={`https://muhamedsadovic-001-site1.ftempurl.com/Images/${boat.imageName}`}
        alt=""
        onClick={() => openModal(boat.imageName)}
      />
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
              className="custom-input"
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
              className="custom-input"
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
          <div className={boat.available ? "dugmici" : "noRent"}>
            <button onClick={redirectToCheckout} disabled={!boat.available}>
              Rent
            </button>
          </div>
        )}
        {isModalOpen && (
          <div className="modal" onClick={closeModal}>
            <span className="close">&times;</span>
            <img
              className="modalContent"
              src={`https://muhamedsadovic-001-site1.ftempurl.com/Images/${selectedImage}`}
              alt="Expanded boat"
            />
            <div className="caption">{selectedImage}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoatDetails;
