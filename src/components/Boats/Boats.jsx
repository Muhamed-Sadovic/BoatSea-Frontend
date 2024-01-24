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
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [filteredBoats, setFilteredBoats] = useState([]);

  useEffect(() => {
    const filtered = allBoats.filter((boat) =>
      boat.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredBoats(filtered);
  }, [name, allBoats]);

  useEffect(() => {
    async function fetchBoats() {
      try {
        const response = await axios.get(`${url}GetAllBoats`);
        setAllBoats(response.data);
      } catch (error) {
        console.error("Error fetching boats:", error);
      }
    }
    fetchBoats();
  }, []);

  useEffect(() => {
    const filtered = allBoats.filter(
      (boat) =>
        (type === "" || type === "All" || boat.type === type) &&
        boat.name.toLowerCase().includes(name.toLowerCase())
    );
    setFilteredBoats(filtered);
  }, [name, type, allBoats]);

  return (
    <>
      <div className="searchbar">
        <form>
          <label>Search by name:</label>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setName(e.target.value)}
          />
          <label>Search by type:</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Sail">Sail</option>
            <option value="Catamaran">Catamaran</option>
            <option value="Motor">Motor</option>
            <option value="Yacht">Yacht</option>
          </select>
        </form>
      </div>
      <div className={filteredBoats.length > 0 ? "boatsContainer" : "tre"}>
        {filteredBoats.length > 0 ? (
          filteredBoats.map((boat) => (
            <div key={boat.id} className="boatContainer">
              <img
                src={`https://localhost:7087/Images/${boat.imageName}`}
                alt="Slika"
              />
              <div class="desc">
                <p className="name">{boat.name}</p>
                <div className="typePrice">
                  <p><span>Type:</span> {boat.type}</p>
                  <p>For <span>{boat.price}$</span> per day</p>
                </div>
                {user && (
                  <div className="dugmici">
                    <Link
                      to={`/boatDetails/${boat.id}`}
                      className="detailsButton"
                    >
                      Details
                    </Link>
                  </div>
                )}
                {!user && (
                  <p className="dugmici">Login for more information</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1 style={{ textAlign: "center" }}>
            There are no boats matching the criteria
          </h1>
        )}
      </div>
    </>
  );
}

export default Boats;
