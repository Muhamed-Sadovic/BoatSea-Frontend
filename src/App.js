import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";
import Login from "./components/login/LoginPage";
import Register from "./components/register/RegisterPage";
import ProfilePage from "./profile/ProfilePage";
import VerificationPage from "./components/verification/VerificationPage";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/verification/:userId" Component={VerificationPage} />
        <Route path="/forgot-password" Component={ForgotPassword} />
        <Route path="reset-password" Component={ResetPassword} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
