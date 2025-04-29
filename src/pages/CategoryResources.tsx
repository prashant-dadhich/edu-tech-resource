
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResourceLink from '../components/ResourceLink';
import { getClassById, getCategoryById, getResourcesByClassAndCategory } from '../data/classData';

const CategoryResources: React.FC = () => {
  const { classId, categoryId } = useParams<{ classId: string; categoryId: string }>();
  
  const classData = classId ? getClassById(classId) : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const resources = classId && categoryId 
    ? getResourcesByClassAndCategory(classId, categoryId) 
    : [];

  if (!classData || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="page-container">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-red-600 mb-4">
                Resource Category Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sorry, the resource category you're looking for doesn't exist.
              </p>
              <Link 
                to="/" 
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-education-blue hover:bg-education-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-education-blue"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header classTitle={`${classData.name} - ${category.name}`} />
      
      <main className="flex-grow">
        <div className="page-container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="divider">/</span>
            <Link to={`/class/${classId}`}>{classData.name}</Link>
            <span className="divider">/</span>
            <span>{category.name}</span>
          </div>
          
          <div className="mb-10">
            <h1 className="page-title">{category.name} for {classData.name}</h1>
            <p className="text-lg text-gray-600 max-w-4xl">
              {category.description} for {classData.name} students. 
              Click on any resource to access its Google Drive folder.
            </p>
          </div>
          
          {resources.length > 0 ? (
            <div className="resource-grid mb-12">
              {resources.map((resource) => (
                <ResourceLink key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Resources Available Yet</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                There are currently no resources available in this category. Please check back later.
              </p>
            </div>
          )}
          
          <div className="flex justify-center mt-8">
            <Link 
              to={`/class/${classId}`} 
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-education-blue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
              Back to {classData.name} Resources
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryResources;
