import React from 'react'

const Navbar = () => {
  return (
    <div>
        <div className="bg-orange-500 text-white text-xs py-1 px-4">
        <div className="container mx-auto text-center">
          Free Courses 🌟 Sale Ends Soon, Get It Now
          <span className="float-right">-&gt;</span>
        </div>
      </div>
              <header className="bg-orange-500 text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">S</div>
          <nav>
            <ul className="flex space-x-4 text-sm">
              <li>Home</li>
              <li>Courses</li>
              <li>About Us</li>
              <li>Pricing</li>
              <li>Contact</li>
            </ul>
          </nav>
          <div className="space-x-2">
            <button variant="ghost" className="text-white hover:bg-orange-600">
              Sign Up
            </button>
            <button   variant="ghost" className="text-white hover:bg-orange-600">
              Login
            </button>
          </div>
        </div>
      </header>

      

    </div>
  )
}

export default Navbar