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
import { AuthContext } from "./context/AuthContext";
import BoatDetails from "./components/boatDetails/BoatDetails";
import EditBoat from "./components/editBoat/EditBoat";
import Payment from "./components/payment/Payment";
import EditUser from "./components/editUser/EditUser";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import ProtectedRoute from "./context/ProtectedRoute";
import axios from "axios";
import "@stripe/stripe-js";
import "./App.css";

function App() {
  const { setUserFunction } = useContext(AuthContext);

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
        <Route path="/unauthorized" Component={Unauthorized} />
        <Route path="/verifyAccount/:id" Component={VerificationPage} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="/reset-password/:token" Component={ResetPassword} />
        <Route path="/boats" Component={Boats} />
        <Route path="/payment" Component={Payment} />
        <Route
          path="/boatDetails/:id"
          element={
            <ProtectedRoute>
              <BoatDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editBoat/:id"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <EditBoat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={["User"]}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminpanel"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createboat"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <CreateBoat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editUser/:id"
          element={
            <ProtectedRoute roles={["User"]}>
              <EditUser />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
