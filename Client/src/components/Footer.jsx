import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-50 mt-8 py-8 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
          <div>
            <div className="text-2xl font-bold mb-1">LearnLink</div>
            <p className="text-sm italic -mt-1 mb-5">Education Simplified, Success Amplified</p>
            <p>hello@learnlink.com</p>
            <p>+977 98123 45678</p>
            <p>Pokhara, Nepal</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Home</h3>
            <ul className="space-y-1">
              <li className="hover:text-orange-500 cursor-pointer">Benefits</li>
              <li className="hover:text-orange-500 cursor-pointer">Our Courses</li>
              <li className="hover:text-orange-500 cursor-pointer">Our Testimonials</li>
              <li className="hover:text-orange-500 cursor-pointer">Our FAQ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">About Us</h3>
            <ul className="space-y-1">
              <li className="hover:text-orange-500 cursor-pointer">Company</li>
              <li className="hover:text-orange-500 cursor-pointer">Achievements</li>
              <li className="hover:text-orange-500 cursor-pointer">Our Goals</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Social Profiles</h3>
            <div className="flex space-x-3">
              <button className="w-8 h-8 bg-gray-200 text-center rounded-full hover:bg-orange-500 hover:text-white transition duration-300">f</button>
              <button className="w-8 h-8 bg-gray-200 text-center rounded-full hover:bg-orange-500 hover:text-white transition duration-300">t</button>
              <button className="w-8 h-8 bg-gray-200 text-center rounded-full hover:bg-orange-500 hover:text-white transition duration-300">in</button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600">
          © 2023 LearnLink. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
