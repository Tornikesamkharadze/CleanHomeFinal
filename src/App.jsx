import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import "./App.css";
import "./styles/ScrollToTop.scss";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import StandartClean from "./components/StandartClean";
import GeneralCleaning from "./components/GeneralCleaning";
import CraftsMan from "./pages/CraftsMan";
import UserOrders from "./pages/UserOrders";
import { FooterWithSocialLinks } from "./components/Footer";
import ScrollTop from "./components/ScrollTop";
import AdminPage from "./pages/AdminPage";
import Administrators from "./pages/Administrators";
import NotFoundPage from "./pages/404";
import UsersPage from "./pages/UserPage";

function App() {
  const [user, setUser] = useState(null); // State to store user data

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        // Make a GET request to fetch the user data
        const response = await axios.get("http://localhost:3001/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        /*  console.log(response.data.role);  */
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Navbar />
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route index="/" element={<HomePage />} />
          <Route path="/category/general/order" element={<GeneralCleaning />} />
          <Route path="/category/standart/order" element={<StandartClean />} />
          <Route path="/category/craftsman/order" element={<CraftsMan />} />
          <Route path="/user_orders" element={<UserOrders />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              user?.role === "ADMIN" ? (
                <AdminPage />
              ) : (
                <NotFoundPage to="/404" />
              )
            }
          />
          <Route
            path="/userspage"
            element={
              user?.role === "ADMIN" ? (
                <UsersPage />
              ) : (
                <NotFoundPage to="/404" />
              )
            }
          />
          <Route
            path="/administrators"
            element={
              user?.role === "ADMIN" ? (
                <Administrators />
              ) : (
                <NotFoundPage to="/404" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      <FooterWithSocialLinks />
    </>
  );
}

export default App;
