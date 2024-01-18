import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/myContext";
import "./BoatDetails.css";
const url = "https://localhost:7087/api/Boat/";

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
  function handleRent(id) {}

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
          <span>Price:</span> {boat.price}$
        </p>
        <p>
          <span>Additional Information:</span> {boat.description}
        </p>
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
            <button onClick={() => handleRent(boat.id)}>Rent</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoatDetails;


//   useEffect(() => {
//     async function fetchBoats() {
//       try {
//         const response = await axios.get(`${url}GetAllBoats`);
//         setAllBoats(response.data);
//       } catch (error) {
//         console.error("Error fetching boats:", error);
//       }
//     }
//     fetchBoats();
//   }, []);

//   useEffect(() => {
//     const filtered = allBoats.filter(
//       (boat) =>
//         (type === "" || boat.type === type) &&
//         boat.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredBoats(filtered);
//   }, [search, type, allBoats]);


//   return (
//     <>
//       <div className="searchbar">
//         <input
//           type="text"
//           placeholder="Pretraži po imenu..."
//           value={search}
//           onChange={handleSearchChange}
//         />
//         <select name="type" value={type} onChange={handleTypeChange}>
//           <option value="">Svi Tipovi</option>
//           <option value="Sail">Sail</option>
//           <option value="Catamaran">Catamaran</option>
//           <option value="Motor">Motor</option>
//           <option value="Yacht">Yacht</option>
//         </select>
//       </div>
//       <div className={filteredBoats.length > 0 ? "boatsContainer" : "tre"}>
//         {filteredBoats.length > 0 ? (
//           filteredBoats.map((boat) => (
//             <div key={boat.id} className="boatContainer">
//               <img
//                 src={`https://localhost:7087/Images/${boat.imageName}`}
//                 alt="Slika"
//               />
//               <div class="desc">
//                 <p className="name">{boat.name}</p>
//                 <div className="typePrice">
//                   <p>Type: {boat.type}</p>
//                   <p>From {boat.price}$ per day</p>
//                 </div>
//                 {user && (
//                   <div className="dugmici">
//                     <Link
//                       to={`/boatDetails/${boat.id}`}
//                       className="detailsButton"
//                     >
//                       Details
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <h1 style={{ textAlign: "center" }}>
//             Nema čamaca koji odgovaraju kriterijumima
//           </h1>
//         )}
//       </div>
//     </>
//   );
// }

// export default Boats;

// {
//   /* <img
//                 src={`https://localhost:7087/Images/${boat.imageName}`}
//                 alt="Slika"
//               />
//               <div class="desc">
//                 <p className="name">{boat.name}</p>
//                 <div className="typePrice">
//                   <p>Type: {boat.type}</p>
//                   <p>From {boat.price}$ per day</p>
//                 </div>
//                 {user && (
//                   <div className="dugmici">
//                     <Link
//                       to={`/boatDetails/${boat.id}`}
//                       className="detailsButton"
//                     >
//                       Details
//                     </Link>
//                   </div>
//                 )}
//               </div> */
// }

