import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/myContext";
import "./BoatDetails.css";
const url = "https://localhost:7087/api/Boat/";

function BoatDetails() {
  const { id } = useParams();
  const { user } = useContext(MyContext);
  const [boat, setBoat] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
    imageName: "",
    description: "",
  });

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

  function handleUpdate(id) {}

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
      } catch (e) {
        console.error(e);
      }
    }
  }
  function handleRent(id) {}

  return (
    <div className="boatDetailsContainer">
      <div>
        <img src={`https://localhost:7087/Images/${boat.imageName}`} alt="" />
      </div>
      <div className="details">
        <h1>Details</h1>
        <p><span>Name:</span> {boat.name}</p>
        <p><span>Boat type:</span> {boat.type}</p>
        <p><span>Price:</span> {boat.price}$</p>
        <p><span>Additional Information:</span> {boat.description}</p>
        {user && user.user.role === "Admin" ? (
          <div className="dugmici">
            <button onClick={() => handleUpdate(boat.id)}>Edit</button>
            <button id="crvena" onClick={() => handleDeleteBoat(boat.id)}>Delete</button>
          </div>
        ) : (
          <button onClick={() => handleRent(boat.id)}>Rent</button>
        )}
      </div>
    </div>
  );
}

export default BoatDetails;
