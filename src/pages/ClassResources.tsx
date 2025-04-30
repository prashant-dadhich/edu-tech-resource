
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import EducatorProfile from '../components/EducatorProfile';
import { getClassById, getResourcesByClassAndCategory } from '../data/classData';

const ClassResources: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const classData = classId ? getClassById(classId) : undefined;

  if (!classData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="page-container">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-red-600 mb-4">
                Class Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sorry, the class you're looking for doesn't exist.
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
      <Header classTitle={classData.name} />
      
      <main className="flex-grow">
        <div className="page-container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="divider">/</span>
            <span>{classData.name}</span>
          </div>
          
          <div className="mb-10">
            <h1 className="page-title">Resources for {classData.name}</h1>
            <p className="text-lg text-gray-600 max-w-4xl">
              Access all educational materials for {classData.name}. 
              Click on "View Chapters" to see chapter-specific resources.
            </p>
          </div>
          
          <div className="resource-grid mb-12">
            {classData.categories.map((category) => {
              const resources = getResourcesByClassAndCategory(classData.id, category.id);
              const resourceCount = resources.length;
              // For categories with chapters, count the chapters instead of resources
              const count = category.chapters ? category.chapters.length : resourceCount;
              
              return (
                <CategoryCard
                  key={category.id}
                  classId={classData.id}
                  id={category.id}
                  name={category.name}
                  description={category.description}
                  icon={category.icon}
                  count={count}
                />
              );
            })}
          </div>
          
          <section className="mb-12">
            <h2 className="section-title mb-6">About Your Educator</h2>
            <EducatorProfile />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClassResources;
