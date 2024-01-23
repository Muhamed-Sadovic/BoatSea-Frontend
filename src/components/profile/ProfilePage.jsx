import { useEffect, useState } from "react";
import axios from "axios";
import "./ProfilePage.css";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
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

  function handleDeleteBoat(id){
    const isConfirmed = window.confirm(
      "Da li ste sigurni da želite da otkazete ovaj rent?"
    );
    if (isConfirmed) {
      try {
        axios.delete(`https://localhost:7087/api/Rent/CancelRent/${id}`)
        alert("Uspesno ste otkazali rent!");
        navigate("/profile");
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div className="userContainer">
      <div className="podaci">
        <img
          src={`https://localhost:7087/Images/${userData.imageName}`}
          alt=""
        />
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </div>
      <div className="rentedBoats">
        <h3>Your rents</h3>
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
              <button onClick={() => handleDeleteBoat(boat.id)}>Cancel</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
