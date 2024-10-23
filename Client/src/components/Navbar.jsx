import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
          {/* Logo */}
          <div className="text-2xl font-bold" aria-label="Logo">
            L
          </div>

          {/* Mobile Menu Toggle Button */}
          <Button
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
          </Button>
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-4 text-sm">
            <ul className="flex space-x-4">
              <Link to={'/'} className="cursor-pointer hover:text-orange-200">Home</Link>
              <Link to={'/courses'} className="cursor-pointer hover:text-orange-200">Courses</Link>
              <Link to={'/about'} className="cursor-pointer hover:text-orange-200">About Us</Link>
              <Link to={'/pricing'} className="cursor-pointer hover:text-orange-200">Pricing</Link>
              <Link to={'/contact'} className="cursor-pointer hover:text-orange-200">Contact</Link>
              <Link to={'/profile'} className="cursor-pointer hover:text-orange-200">Profile</Link>
              <Link to={'/classroom'} className="cursor-pointer hover:text-orange-200">ClassRoom</Link>
            </ul>
          </nav>

          <div className="space-x-2 hidden md:block">
            <Button variant="default" className="border-white text-white hover:bg-orange-600">
              <Link to={'/signup'}>Sign Up</Link>
            </Button>
            <Button variant="default" className="border-white text-white hover:bg-orange-600">
            <Link to={'/login'}>Log In</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-orange-500 text-white py-4 px-4 space-y-4">
            <ul>
            <Link to={'/'} className="cursor-pointer hover:text-orange-200">Home</Link>
              <Link to={'/courses'} className="cursor-pointer hover:text-orange-200">Courses</Link>
              <Link to={'/about'} className="cursor-pointer hover:text-orange-200">About Us</Link>
              <Link to={'/pricing'} className="cursor-pointer hover:text-orange-200">Pricing</Link>
              <Link to={'/contact'} className="cursor-pointer hover:text-orange-200">Contact</Link>
              <Link to={'/profile'} className="cursor-pointer hover:text-orange-200">Profile</Link>
            </ul>
            <div className="space-y-2">
              <Button variant="outline" className="w-full border-white text-white hover:bg-orange-600">
                Sign Up
              </Button>
              <Button variant="outline" className="w-full border-white text-white hover:bg-orange-600">
                Login
              </Button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
