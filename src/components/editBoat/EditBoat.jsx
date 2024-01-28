import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const url = "http://muhamedsadovic-001-site1.ftempurl.com/api/Boat/";

function EditBoat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boatName, setBoatName] = useState("");
  const [type, setType] = useState("Sail");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}GetBoatById/${id}`);
        const responseData = response.data;
        setBoatName(responseData.name);
        setType(responseData.type);
        setPrice(responseData.price);
        setDescription(responseData.description);
      } catch (error) {
        console.error("Error fetching boat details:", error);
      }
    };

    fetchData();
  }, [id]);

  const PromenaSlike = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFile(null);
    }
  };
  const handleSelectChange = (event) => {
    setType(event.target.value);
  };

  async function updateBoatHandler(e) {
    e.preventDefault();
    let isValid = true;

    if (boatName.trim().length === 0) {
      setErrorMessage("Please enter the name of the boat");
      isValid = false;
      return;
    } else {
      setErrorMessage(null);
    }

    if (price.length === 0) {
      setErrorMessage("Please enter the price");
      isValid = false;
      return;
    } else {
      setErrorMessage(null);
    }

    if (!file) {
      setErrorMessage("Please upload an image");
      isValid = false;
      return;
    } else {
      setErrorMessage(null);
    }

    if (description.trim().length === 0) {
      setErrorMessage("Please enter the description");
      isValid = false;
      return;
    } else {
      setErrorMessage(null);
    }

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("name", boatName);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("ImageName", fileName);
    formData.append("Image", file);
    formData.append("description", description);

    try {
      const response = await axios.put(
        `http://muhamedsadovic-001-site1.ftempurl.com/api/Boat/UpdateBoat/${id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Successfully updated boat for rent");
      navigate("/boats");
    } catch (e) {
      console.error(e.response.data);
    }
  }
  return (
    <div className="createBoatContainer">
      <h3>Edit boat</h3>
      <form onSubmit={updateBoatHandler}>
        <div className="crBoatData">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={boatName}
            placeholder="Enter name"
            onChange={(e) => setBoatName(e.target.value)}
          />
        </div>
        <div className="crBoatData">
          <label>Type</label>
          <select name="type" value={type} onChange={handleSelectChange}>
            <option value="Sail">Sail</option>
            <option value="Catamaran">Catamaran</option>
            <option value="Motor">Motor</option>
            <option value="Yacht">Yacht</option>
          </select>
        </div>
        <div className="crBoatData">
          <label>Price/per day</label>
          <input
            type="text"
            name="price"
            value={price}
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="crBoatData">
          <label>Image</label>
          <input type="file" id="image" name="image" onChange={PromenaSlike} />
        </div>
        <div className="desc">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="buttonDiv">
          <button type="submit">Edit</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}

export default EditBoat;
