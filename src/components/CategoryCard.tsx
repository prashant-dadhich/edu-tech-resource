
import React from 'react';
import { Book, FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  classId: string;
  id: string;
  name: string;
  description: string;
  icon: string;
  count?: number;
  driveLink?: string;
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
          {count > 0 ? (
            <Link 
              to={`/class/${classId}/category/${id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-education-blue hover:bg-education-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-education-blue"
            >
              View Chapters
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          ) : (
            <span className="text-gray-400 text-sm">No resources available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
