import { useEffect, useState } from "react";
import { MyContext } from "../../context/myContext";
import axios from "axios";
import "./AdminPanel.css";
const url = "https://localhost:7087/api/User/";

function AdminPanel() {
  let token = "";
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    imageName: "",
  });
  const [allUsers, setAllUsers] = useState([
    {
      name: "",
      email: "",
      role: "",
    },
  ]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser.user;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    token = storedUser.token;
    if (user) {
      setAdminData({
        name: user.name || "",
        email: user.email || "",
        imageName: user.imageName || "",
      });
    }
    GetAllUsers();
  }, []);

  async function GetAllUsers() {
    const response = await axios.get(`${url}getAllUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const responseData = response.data;
    setAllUsers(responseData);
  }

  function DeleteUser(id) {
    const isConfirmed = window.confirm(
      "Da li ste sigurni da želite da obrišete ovog korisnika?"
    );
    if (isConfirmed) {
      try {
        axios.delete(`${url}deleteUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <div className="adminPanelContainer">
      <div className="podaci">
        <img
          src={`https://localhost:7087/Images/${adminData.imageName}`}
          alt=""
        />
        <p>Name: {adminData.name}</p>
        <p>Email: {adminData.email}</p>
      </div>
      <div className="users">
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "User" && (
                    <button onClick={() => DeleteUser(user.id)}>X</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPanel;
