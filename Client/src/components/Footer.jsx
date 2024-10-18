import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-white mt-8 py-8 text-sm">
        <div className="container mx-auto flex justify-between">
          <div>
            <div>
            <div className="text-2xl font-bold mb-2">LearnLink
            </div>
            <p className='text-sm -mt-2 mb-5 italic'>Education Simplified, Success Amplified</p>
            </div>
            <p>hello@learnlink.com</p>
            <p>+977 98123 45678</p>
            <p>Pokhara, Nepal</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Home</h3>
            <ul className="space-y-1">
              <li>Benefits</li>
              <li>Our Courses</li>
              <li>Our Testimonials</li>
              <li>Our FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">About Us</h3>
            <ul className="space-y-1">
              <li>Company</li>
              <li>Achievements</li>
              <li>Our Goals</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Social Profiles</h3>
            <div className="flex space-x-2">
              <button variant="outline" size="icon" className="w-8 h-8 rounded-full">f</button>
              <button variant="outline" size="icon" className="w-8 h-8 rounded-full">t</button>
              <button variant="outline" size="icon" className="w-8 h-8 rounded-full">in</button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">© 2023 LearnLink. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Footer;
