
import React from 'react';
import { Link } from 'react-router-dom';

interface ClassCardProps {
  id: string;
  name: string;
  description: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ id, name, description }) => {
  return (
    <Link 
      to={`/class/${id}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-education-blue h-3" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-education-darkBlue mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-end">
          <span className="inline-flex items-center text-education-blue font-medium text-sm">
            View Resources
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ClassCard;
