import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditUser.css";
const url = "http://muhamedsadovic-001-site1.ftempurl.com/api/User/";

function EditUser() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [imageErrorMessage, setImageErrorMessage] = useState(null);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const PromenaSlike = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}GetById/${id}`);
        const responseData = response.data;
        setName(responseData.name);
        setEmail(responseData.email);
      } catch (error) {
        console.error("Error fetching boat details:", error);
      }
    };

    fetchData();
  }, [id]);

  async function editUserHandler(e) {
    e.preventDefault();
    let isValid = true;

    if (name.trim().length === 0) {
      setNameErrorMessage("Please enter your name!");
      isValid = false;
      return;
    } else {
      setNameErrorMessage(null);
    }

    if (email.length === 0) {
      setEmailErrorMessage("Please enter your email!");
      isValid = false;
      return;
    } else {
      setEmailErrorMessage(null);
    }

    if (!file) {
      setImageErrorMessage("Please upload an image");
      isValid = false;
      return;
    } else {
      setImageErrorMessage(null);
    }

    if (!isValid) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("ImageName", fileName);
    formData.append("Image", file);

    try {
      const response = await axios.put(
        `${url}UpdateUser/${id}`,
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      alert("Successfully updated data");
      navigate("/profile");
    } catch (e) {
      console.error(e.response.data);
    }
  }

  return (
    <div className="editUserContainer">
      <h1>Edit</h1>
      <form onSubmit={editUserHandler}>
        <label>
          <strong>Name</strong>
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          autoComplete="off"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameErrorMessage && <p>{nameErrorMessage}</p>}
        <label>
          <strong>Email</strong>
        </label>
        <input
          type="email"
          placeholder="Enter Email"
          autoComplete="off"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailErrorMessage && <p>{emailErrorMessage}</p>}
        <label>
          <strong>Select Image</strong>
        </label>
        <input type="file" id="image" name="image" onChange={PromenaSlike} />
        {imageErrorMessage && <p>{imageErrorMessage}</p>}
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}

export default EditUser;
