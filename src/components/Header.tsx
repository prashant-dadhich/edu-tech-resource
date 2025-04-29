
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  classTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ classTitle }) => {
  return (
    <header className="bg-education-darkBlue text-white py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span className="font-bold text-xl">Learn with Naman</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            {classTitle && (
              <span className="text-lg font-medium mr-2">{classTitle}</span>
            )}
            <span className="text-sm text-gray-200 hidden md:inline">
              Crafted by Naman
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
