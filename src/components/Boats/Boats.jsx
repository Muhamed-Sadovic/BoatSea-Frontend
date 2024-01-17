import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { MyContext } from "../../context/myContext";
import { Link } from "react-router-dom";
import "./Boats.css";
const url = "https://localhost:7087/api/Boat/";

function Boats() {
  const { user } = useContext(MyContext);
  const [allBoats, setAllBoats] = useState([
    {
      id: "",
      name: "",
      type: "",
      price: "",
      imageName: "",
      description: "",
    },
  ]);
  console.log(user);

  useEffect(() => {
    GetAllBoats();
  }, []);

  async function GetAllBoats() {
    const response = await axios.get(`${url}GetAllBoats`);
    const responseData = response.data;
    setAllBoats(responseData);
  }

  return (
    <div className="boatsContainer">
      {allBoats.map((boat) => (
        <div key={boat.id} className="boatContainer">
          <img
            src={`https://localhost:7087/Images/${boat.imageName}`}
            alt="Slika"
          />
          <div class="desc">
            <p className="name">{boat.name}</p>
            <div className="typePrice">
              <p>Type: {boat.type}</p>
              <p>From {boat.price}$ per day</p>
            </div>
            <p className="descc">{boat.description}</p>
            <div className="dugmici">
              <Link to={`/boatDetails/${boat.id}`} className="detailsButton">
                Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Boats;
