import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice"; 

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector(state => state.auth.status); 

  return (
    <div>
      {/* Top Banner */}
      <div className="bg-orange-500 text-white text-xs py-1 px-4">
        <div className="container mx-auto text-center">
          Free Courses 🌟 Sale Ends Soon, Get It Now
          <span className="float-right">-&gt;</span>
        </div>
      </div>

      <header className="bg-orange-500 text-white py-2">
        <div className="flex justify-between px-5 md:hidden">
          <div className="text-2xl font-bold" aria-label="Logo">
            <button onClick={() => navigate("/")}>L</button>
          </div>
          <div>
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger />
            </SidebarProvider>
          </div>
        </div>

        <div className="hidden container mx-auto md:flex justify-between items-center">
          <div className="text-2xl font-bold" aria-label="Logo">
            <button onClick={() => navigate("/")}>L</button>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-4 text-lg">
            <ul className="flex space-x-4">
              <Link to="/" className="cursor-pointer hover:text-orange-200">Home</Link>
              <Link to="/courses" className="cursor-pointer hover:text-orange-200">Courses</Link>
              <Link to="/about" className="cursor-pointer hover:text-orange-200">About Us</Link>
              <Link to="/contact" className="cursor-pointer hover:text-orange-200">Contact</Link>

              {/* Protected Routes */}
              {authStatus && (
                <>
                  <Link to="/classRoom" className="cursor-pointer hover:text-orange-200">Classroom</Link>
                  <Link to="/searchnotes" className="cursor-pointer hover:text-orange-200">SearchNotes</Link>
                  <Link to="/profile" className="cursor-pointer hover:text-orange-200">Profile</Link>
                  <Link to="/reward" className="cursor-pointer hover:text-orange-200">Reward</Link>
                </>
              )}
            </ul>
          </nav>

          <div className="space-x-2 hidden md:block">
            {!authStatus ? (
              <>
                <Button variant="ghost" className="border-white text-lg hover:bg-orange-600">
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <Button variant="default" className="border-white text-white text-lg hover:bg-orange-600 bg-orange-500">
                  <Link to="/login">Log In</Link>
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                className="border-white text-lg hover:bg-orange-600"
                onClick={() => dispatch(logout())}
              >
                Log Out
              </Button>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
