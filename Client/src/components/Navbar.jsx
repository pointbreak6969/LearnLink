import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        <div className="container mx-auto flex justify-between items-center">
         
          <div className="text-2xl font-bold" aria-label="Logo">L</div>

          <button
            className="text-white md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>

          {/* Navigation Links  */}
          <nav className="hidden md:flex space-x-4 text-sm">
            <ul className="flex space-x-4">
              <li className="cursor-pointer hover:text-orange-200">Home</li>
              <li className="cursor-pointer hover:text-orange-200">Courses</li>
              <li className="cursor-pointer hover:text-orange-200">About Us</li>
              <li className="cursor-pointer hover:text-orange-200">Pricing</li>
              <li className="cursor-pointer hover:text-orange-200">Contact</li>
            </ul>
          </nav>

          {/* Auth Buttons */}
          <div className="space-x-2 hidden md:block">
            <button
              variant="ghost"
              className="text-white px-3 py-1 border border-white rounded hover:bg-orange-600 transition duration-300"
              aria-label="Sign Up"
            >
              Sign Up
            </button>
            <button
              variant="ghost"
              className="text-white px-3 py-1 border border-white rounded hover:bg-orange-600 transition duration-300"
              aria-label="Login"
            >
              Login
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-orange-500 text-white py-4 px-4 space-y-4">
            <ul>
              <li className="cursor-pointer hover:text-orange-200">Home</li>
              <li className="cursor-pointer hover:text-orange-200">Courses</li>
              <li className="cursor-pointer hover:text-orange-200">About Us</li>
              <li className="cursor-pointer hover:text-orange-200">Pricing</li>
              <li className="cursor-pointer hover:text-orange-200">Contact</li>
            </ul>
            <div className="space-y-2">
              <button
                variant="ghost"
                className="w-full text-white px-3 py-1 border border-white rounded hover:bg-orange-600 transition duration-300"
                aria-label="Sign Up"
              >
                Sign Up
              </button>
              <button
                variant="ghost"
                className="w-full text-white px-3 py-1 border border-white rounded hover:bg-orange-600 transition duration-300"
                aria-label="Login"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
