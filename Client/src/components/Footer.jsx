import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <img src="/placeholder.svg?height=40&width=40&text=LL" alt="LearnLink Logo" width={40} height={40} className="rounded-lg" />
            <p className="text-sm text-gray-400">Connecting learners worldwide through interactive education and collaboration.</p>
          </div>
          {["Company", "Resources", "Legal"].map((category) => (
            <div key={category} className="space-y-4">
              <h3 className="text-lg font-semibold">{category}</h3>
              <ul className="space-y-2">
                {["About", "Careers", "Contact", "Blog"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © 2024 LearnLink. All rights reserved.
        </div>
      </footer>
  );
};

export default Footer;
