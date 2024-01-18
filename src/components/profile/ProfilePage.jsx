import { useEffect, useState } from "react";

export default function ProfilePage() {
  let token = "";
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    imageName: "",
  });
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const user = storedUser.user;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    token = storedUser.token;
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        imageName: user.imageName || "",
      });
    }
  }, []);
  return (
    <div className="adminPanelContainer">
      <div className="podaci">
        <img
          src={`https://localhost:7087/Images/${userData.imageName}`}
          alt=""
        />
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
