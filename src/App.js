import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import HomePage from "./components/homepage/HomePage";
import Login from "./components/login/LoginPage";
import Register from "./components/register/RegisterPage";
import ProfilePage from "./components/profile/ProfilePage";
import VerificationPage from "./components/verification/VerificationPage";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import AdminPanel from "./components/adminPanel/AdminPanel";
import CreateBoat from "./components/createBoat/CreateBoat";
import Boats from "./components/Boats/Boats";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { MyContext } from "./context/myContext";
import axios from "axios";
import BoatDetails from "./components/boatDetails/BoatDetails";
import EditBoat from "./components/editBoat/EditBoat";

function App() {
  const { setUserFunction } = useContext(MyContext);

  useEffect(() => {
    const data = localStorage.getItem("user");
    const currentUser = JSON.parse(data);
    if (currentUser) {
      setUserFunction(currentUser);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${currentUser.token}`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/boatDetails/:id" Component={BoatDetails} />
        <Route path="/editBoat/:id" Component={EditBoat} />
        <Route path="/verifyAccount/:id" Component={VerificationPage} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/reset-password/:token" Component={ResetPassword} />
        <Route path="/adminpanel" Component={AdminPanel} />
        <Route path="/createboat" Component={CreateBoat} />
        <Route path="/boats" Component={Boats} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
