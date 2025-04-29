
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText } from 'lucide-react';

interface CategoryCardProps {
  classId: string;
  id: string;
  name: string;
  description: string;
  icon: string;
  count?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  classId, 
  id, 
  name, 
  description, 
  icon,
  count = 0
}) => {
  // Render the appropriate icon based on the icon string
  const renderIcon = () => {
    switch (icon) {
      case 'book':
        return <Book className="h-8 w-8 text-education-purple" />;
      case 'file-text':
      default:
        return <FileText className="h-8 w-8 text-education-blue" />;
    }
  };

  return (
    <Link 
      to={`/class/${classId}/category/${id}`} 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            {renderIcon()}
          </div>
          {count > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-education-lightGray text-gray-800">
              {count} items
            </span>
          )}
        </div>
        <h3 className="text-lg font-semibold text-education-darkBlue mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-end">
          <span className="inline-flex items-center text-education-purple font-medium text-sm">
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

export default CategoryCard;
