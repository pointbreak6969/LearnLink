"use client";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import { useUserContext } from "./context/UserContext";
import "./css/loader.css";
export default function page() {
  const { currentUser, isPending } = useUserContext();

  if (isPending) {
    return (
      <>
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
      </>
    )
  }

  return (
   <>
   <Navbar />
   <Home />
   </>
  );
}
