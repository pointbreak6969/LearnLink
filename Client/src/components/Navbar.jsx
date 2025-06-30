import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { useSelector } from "react-redux";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const handleNavigation = () => {
    if (authStatus) {
      navigate("/classroom");
    } else {
      navigate("/");
    }
  };
  return (
    <div>
      {/* Top Banner */}
      <div className="bg-orange-900 text-white text-xs py-1 px-4">
        <div className="container mx-auto text-center">
          Free Courses 🌟 Sale Ends Soon, Get It Now
          <span className="float-right">-&gt;</span>
        </div>
      </div>

      <header className="bg-gradient-to-b from-orange-500 to bg-red-400 text-white py-2">
        <div className="flex justify-around items-center  md:hidden">
          <div className="text-2xl font-bold" aria-label="Logo">
            <button className="ml-8" onClick={handleNavigation}>L-earn</button>
          </div>
          <div>
            <SidebarProvider>
            <AppSidebar  /> 
          
              <SidebarTrigger  />
            </SidebarProvider>
          </div>
        </div>

        <div className="hidden container mx-auto px-15 md:flex justify-around items-center">
          <div className="text-2xl font-bold" aria-label="Logo">
            <button onClick={handleNavigation}>L-earn</button>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-4 text-lg">
            <ul className="flex space-x-4">
              {!authStatus && (
                <Link to="/" className="cursor-pointer hover:text-orange-200">
                  Home
                </Link>
              )}
              <Link
                to="/courses"
                className="cursor-pointer hover:text-orange-200"
              >
                Courses
              </Link>
              <Link
                to="/about"
                className="cursor-pointer hover:text-orange-200"
              >
                About Us
              </Link>
              

              {/* Protected Routes */}
              {authStatus && (
                <>
                  <Link
                    to="/classroom"
                    className="cursor-pointer hover:text-orange-200"
                  >
                    Classroom
                  </Link>
                  <Link
                    to="/searchclassrooms"
                    className="cursor-pointer hover:text-orange-200"
                  >
                    Search
                  </Link>
          
                </>
              )}
            </ul>
          </nav>

          <div className="space-x-2 hidden md:block">
            {!authStatus ? (
              <>
                <Button
                  variant="ghost"
                  className="border-white text-lg hover:bg-orange-600"
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button
                  variant="default"
                  className="border-white text-white text-lg hover:bg-orange-600 bg-orange-500"
                >
                  <Link to="/login">Log In</Link>
                </Button>
              </>
            ) : (
              <div className="mr-auto">
                <UserAvatar/>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
