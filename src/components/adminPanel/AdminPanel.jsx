import { useEffect, useState } from "react";
import axios from "axios";
import "./AdminPanel.css";
const url = "http://muhamedsadovic-001-site1.ftempurl.com/api/User/";

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

  async function DeleteUser(id) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (isConfirmed) {
      try {
        await axios.delete(`${url}deleteUser/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("User successfully deleted.");

        window.location.reload();
      } catch (e) {
        alert("An error occurred while trying to delete the user.");
        console.error(e);
      }
    }
  }

  return (
    <div className="adminPanelContainer">
      <div className="podaci">
        <h2 style={{ marginTop: 0 }}>Admin</h2>
        <img
          src={`http://muhamedsadovic-001-site1.ftempurl.com/Images/${adminData.imageName}`}
          alt=""
        />
        <p>
          <span>Name:</span> {adminData.name}
        </p>
        <p>
          <span>Email:</span> {adminData.email}
        </p>
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
