import React from "react";
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
import BoatDetails from "./components/boatDetails/BoatDetails";
import EditBoat from "./components/editBoat/EditBoat";
import Payment from "./components/payment/Payment";
import EditUser from "./components/editUser/EditUser";
import axios from "axios";
import "@stripe/stripe-js";
import "./App.css";

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
      <Routes>
      <Navbar />
        <Route path="/" element={HomePage} />
        <Route path="/login" element={Login} />
        <Route path="/register" element={Register} />
        <Route path="/profile" element={ProfilePage} />
        <Route path="/boatDetails/:id" element={BoatDetails} />
        <Route path="/editBoat/:id" element={EditBoat} />
        <Route path="/verifyAccount/:id" element={VerificationPage} />
        <Route path="/forgot-password" element={ForgotPassword} />
        <Route path="/reset-password/:token" element={ResetPassword} />
        <Route path="/adminpanel" element={AdminPanel} />
        <Route path="/createboat" element={CreateBoat} />
        <Route path="/boats" element={Boats} />
        <Route path="/payment" element={Payment} />
        <Route path="/editUser/:id" element={EditUser} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
