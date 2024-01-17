import axios from "axios";
import "./CreateBoat.css";
import { useState } from "react";
function CreateBoat() {
  const [boatName, setBoatName] = useState("");
  const [type, setType] = useState("Sail");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  async function createBoatHandler(e) {
    e.preventDefault();
    let isValid = true;

    if (boatName.trim().length === 0) {
      setErrorMessage("Please enter the name of the boat");
      isValid = false;
      return;
    } else {
      setErrorMessage(null);
    }

    if (price.trim().length === 0) {
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
    formData.append("type",type);
    formData.append("price", price);
    formData.append("ImageName", fileName);
    formData.append("Image", file);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "https://localhost:7087/api/Boat/CreateBoat",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Successfully created boat for rent");
    } catch (e) {
      console.error(e.response.data);
    }
  }

  return (
    <div className="createBoatContainer">
      <h3>Create Boat</h3>
      <h4>Post new boat for rent</h4>
      <form onSubmit={createBoatHandler}>
        <div className="crBoatData">
          <label>Name</label>
          <input
            type="text"
            name="name"
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
            placeholder="Enter description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="buttonDiv">
          <button type="submit">Create</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
}

export default CreateBoat;
