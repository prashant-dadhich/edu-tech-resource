
import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { Resource } from '../data/classData';

interface ResourceLinkProps {
  resource: Resource;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ resource }) => {
  const { title, description, driveLink, date } = resource;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-education-darkBlue mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{date}</span>
        </div>
        
        <div className="flex justify-end">
          <a 
            href={driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-education-blue hover:bg-education-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-education-blue transition-colors"
          >
            Open Drive Folder
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResourceLink;
