import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./services/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { fetchProfileDetails } from "./store/profileReducer";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const session = await authService.getCurrentUser();
        if (session?.data?.data) {
     dispatch(login(session.data.data));
         dispatch(fetchProfileDetails());
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Authentication error:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    return ()=>{
      setLoading(false);
    }
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="loader"></p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
