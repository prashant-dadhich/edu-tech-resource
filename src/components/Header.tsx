
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { educatorData } from '../data/educatorData';

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
              <span className="font-bold text-xl">Learn with Prashant</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {classTitle && (
              <span className="text-lg font-medium mr-2">{classTitle}</span>
            )}
            <div className="hidden md:flex items-center">
              <span className="text-sm text-gray-200 mr-3">
                Crafted by {educatorData.name}
              </span>
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={"/edu-tech-resource/"+educatorData.image} alt={educatorData.name} />
                <AvatarFallback className="bg-education-blue text-white text-xs">
                  {educatorData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
