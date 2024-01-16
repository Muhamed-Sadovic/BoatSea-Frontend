import "./CreateBoat.css";
import { useState } from "react";
function CreateBoat() {
    const [boatName,setBoatName] = useState("")
    const [type,setType] = useState("")
    // const [name,setName] = useState("")
    // const [name,setName] = useState("")
    // const [name,setName] = useState("")


  return (
    <div className="createBoatContainer">
      <h3>Create Boat</h3>
      <h4>Post new boat for rent</h4>
      <form>
        <div className="crBoatData">
          <label htmlFor="">Name</label>
          <input type="text" />
        </div>
        <div className="crBoatData">
          <label htmlFor="">Type</label>
          <select>
            <option>Sail</option>
            <option>Cataman</option>
            <option>Motor</option>
            <option>Yacht</option>
          </select>
        </div>
        <div className="crBoatData">
          <label>Price/per day</label>
          <input type="text" />
        </div>
        <div className="crBoatData">
          <label htmlFor="">Image</label>
          <input type="file" name="" id="" />
        </div>
        <div className="desc">
          <label htmlFor="">Description</label>
          <input type="text" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateBoat;
