import { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    imageName: "",
  });
  const [rentedBoats, setRentedBoats] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser.user;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        imageName: user.imageName || "",
      });
    }
  }, []);

  console.log(rentedBoats);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser.user;
    const fetchRentedBoats = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7087/api/Rent/GetRentsByUser/${user.id}`
        );

        setRentedBoats(response.data);
      } catch (error) {
        console.error("Error fetching rented boats", error);
      }
    };

    fetchRentedBoats();
  }, []);

  console.log(rentedBoats);

  function handleDeleteBoat(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this rental?"
    );
    if (isConfirmed) {
      try {
        axios.delete(`https://localhost:7087/api/Rent/CancelRent/${id}`);
        alert("You have successfully canceled your rent!");
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div className="userContainer">
      <div className="podaci">
        <h2 style={{ marginTop: 0 }}>User</h2>
        <img
          src={`https://localhost:7087/Images/${userData.imageName}`}
          alt=""
        />
        <p>
          <span>Name:</span> {userData.name}
        </p>
        <p>
          <span>Email:</span> {userData.email}
        </p>
        <Link to={`/boatDetails`} className="detailsButton">
          Edit
        </Link>
      </div>
      <div className="rentedBoats">
        <h1>Your rents</h1>
        {rentedBoats.length > 0 ? (
          <div className="rentedBoat">
            {rentedBoats.map((boat) => (
              <div>
                <img
                  src={`https://localhost:7087/Images/${boat.imageName}`}
                  alt=""
                  width="300px"
                  height="300px"
                />
                <p>Name: {boat.name}</p>
                <p>Type: {boat.type}</p>
                <p>Start: {boat.startDate}</p>
                <p>End: {boat.endDate}</p>
                <button onClick={() => handleDeleteBoat(boat.id)}>
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ) : (
          <h3>You have currently no rents</h3>
        )}
      </div>
    </div>
  );
}
