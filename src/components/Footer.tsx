
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} Learn with Naman. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-education-blue text-sm">
              Home
            </Link>
            <a href="#" className="text-gray-600 hover:text-education-blue text-sm">
              Contact
            </a>
            <a href="#" className="text-gray-600 hover:text-education-blue text-sm">
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
