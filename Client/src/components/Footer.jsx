import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const links = {
    Company: [
      { name: "About", to: "/about" },
      { name: "Careers", to: "/careers" },
      { name: "Contact", to: "/contact" },
      { name: "Blog", to: "/blog" }
    ],
    Resources: [
      { name: "Classroom", to: "/" },
      {name:"search",to:"/"},
      { name: "Tutorials", to: "/" },
      { name: "Community", to: "/" }
    ],
    Legal: [
      { name: "Privacy Policy", to: "/" },
      { name: "Terms of Service", to: "/" },
      { name: "Cookie Policy", to: "/" },
      { name: "Accessibility", to: "/" }
    ]
  };

  return (
    <footer className="bg-ink-900 text-white py-16">
      <div className="container mx-auto px-4 grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <div className="font-display text-2xl font-semibold">
            Learn<span className="text-brand-400">Link</span>
          </div>
          <p className="text-sm text-ink-300 leading-relaxed max-w-xs">
            Connecting learners worldwide through interactive classrooms and shared resources.
          </p>
        </div>

        {Object.keys(links).map((category) => (
          <div key={category} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-200">{category}</h3>
            <ul className="space-y-2.5">
              {links[category].map((link) => (
                <li key={link.name}>
                  <a href={link.to} className="text-sm text-ink-400 hover:text-brand-300 transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm text-ink-400">
        © 2026 LearnLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
