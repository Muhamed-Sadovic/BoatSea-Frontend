import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../context/myContext";
import axios from "axios";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    imageName: "",
  });
  const [rentedBoats, setRentedBoats] = useState([]);
  const navigate = useNavigate();
  const { setUserFunction } = useContext(MyContext);
  const [boatsId, setBoatsId] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser.user;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (user) {
      setUserData({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        imageName: user.imageName || "",
      });
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser.user;
    const fetchRentedBoats = async () => {
      try {
        const response = await axios.get(
          `https://muhamedsadovic-001-site1.ftempurl.com/api/Rent/GetRentsByUser/${user.id}`
        );

        setRentedBoats(response.data);
        setBoatsId(response.data.map((boat) => boat.boatId));
      } catch (error) {
        console.error("Error fetching rented boats", error);
      }
    };

    fetchRentedBoats();
  }, []);

  const resetBoatsAvailability = async (boatIds) => {
    try {
      for (const boatId of boatIds) {
        await axios.put(
          `https://muhamedsadovic-001-site1.ftempurl.com/api/Boat/updateAvailableTrue/${boatId}`,
          boatId
        );
      }
    } catch (error) {
      console.error("Error resetting boats availability", error);
    }
  };

  function handleCancelRent(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this rental?"
    );
    if (isConfirmed) {
      try {
        axios.delete(
          `https://muhamedsadovic-001-site1.ftempurl.com/api/Rent/CancelRent/${id}`
        );
        alert("You have successfully canceled your rent!");
        window.location.reload();
      } catch (e) {
        console.error(e);
      }
    }
  }

  const deleteUserHandler = () => {
    setUserFunction(null);
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
    navigate("/login");
  };

  function handleDeleteProfile(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (isConfirmed) {
      if (rentedBoats.length > 0) {
        resetBoatsAvailability(boatsId)
          .then(() => {
            deleteUser(id);
          })
          .catch((error) => {
            console.error("Error resetting boats availability", error);
          });
      } else {
        deleteUser(id);
      }
    }
  }
  function deleteUser(id) {
    try {
      axios.delete(
        `https://muhamedsadovic-001-site1.ftempurl.com/api/User/deleteUser/${id}`
      );
      alert(
        "You have successfully deleted your profile. Bye, see you next time!"
      );
      deleteUserHandler();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="userContainer">
      <div className="podaci">
        <h2 style={{ marginTop: 0 }}>User</h2>
        <img
          src={`https://muhamedsadovic-001-site1.ftempurl.com/Images/${userData.imageName}`}
          alt=""
        />
        <p>
          <span>Name:</span> {userData.name}
        </p>
        <p>
          <span>Email:</span> {userData.email}
        </p>
        <div className="dugmici">
          <Link to={`/editUser/${userData.id}`} className="detailsButton">
            Edit
          </Link>
          <button onClick={() => handleDeleteProfile(userData.id)}>
            Delete profile
          </button>
        </div>
      </div>
      <div className="rentedBoats">
        <h1>Your rents</h1>
        {rentedBoats.length > 0 ? (
          <div className="rentedBoat">
            {rentedBoats.map((boat) => (
              <div>
                <img
                  src={`https://muhamedsadovic-001-site1.ftempurl.com/Images/${boat.imageName}`}
                  alt=""
                  width="300px"
                  height="300px"
                />
                <p>
                  <span>Name:</span> {boat.name}
                </p>
                <p>
                  <span>Type:</span> {boat.type}
                </p>
                <p>
                  <span>Start:</span> {boat.startDate}
                </p>
                <p>
                  <span>End:</span> {boat.endDate}
                </p>
                <button onClick={() => handleCancelRent(boat.id)}>
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
