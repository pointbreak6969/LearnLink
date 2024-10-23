import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./Sidebar";

const Navbar = () => {
  return (
    <div>
      {/* Top Banner */}
      <div className="bg-orange-500 text-white text-xs py-1 px-4">
        <div className="container mx-auto text-center relative">
          Free Courses 🌟 Sale Ends Soon, Get It Now
          <span className="absolute right-4 top-0 bottom-0 flex items-center">
            &rarr;
          </span>
        </div>
      </div>

      <header className="bg-orange-500 text-white py-2">
        <div className="flex justify-between px-5 md:hidden">
          <div className="text-2xl font-bold" aria-label="Logo">
            L
          </div>
          <div>
            <SidebarProvider>
              <AppSidebar/>
              <SidebarTrigger/>
            </SidebarProvider>
          </div>
        </div>

        {/* desktop view */}
        <div className="hidden container mx-auto md:flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold" aria-label="Logo">
            L
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-4 text-sm">
            <ul className="flex space-x-4">
              <Link to={'/'} className="cursor-pointer hover:text-orange-200">Home</Link>
              <Link to={'/courses'} className="cursor-pointer hover:text-orange-200">Courses</Link>
              <Link to={'/about'} className="cursor-pointer hover:text-orange-200">About Us</Link>
              <Link to={'/pricing'} className="cursor-pointer hover:text-orange-200">Pricing</Link>
              <Link to={'/contact'} className="cursor-pointer hover:text-orange-200">Contact</Link>
              <Link to={'/profile'} className="cursor-pointer hover:text-orange-200">Profile</Link>
            </ul>
          </nav>

          <div className="space-x-2 hidden md:block">
            <Button
              variant="default"
              className="border-white text-white hover:bg-orange-600"
            >
              <Link to={"/signup"}>Sign Up</Link>
            </Button>
            <Button
              variant="default"
              className="border-white text-white hover:bg-orange-600"
            >
              <Link to={"/login"}>Log In</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
