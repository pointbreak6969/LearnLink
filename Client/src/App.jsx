import React, { useState, useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "sonner";
function App() {
const { user, loading, authStatus } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="loader"></p>
      </div>
    );
  }
  return (
    <>
      <Toaster
        position="top-center"
        richColors
        closeButton
        theme="light"
      />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
