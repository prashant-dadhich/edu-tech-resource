
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClassCard from '../components/ClassCard';
import EducatorProfile from '../components/EducatorProfile';
import { classes } from '../data/classData';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="page-container">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-education-darkBlue mb-4">
              Learn with Prashant
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access educational resources organized by class and category. 
              Select your class to get started.
            </p>
          </div>
          
          <section className="mb-12">
            <h2 className="section-title text-center mb-8">Know Your Educator</h2>
            <EducatorProfile />
          </section>
          
          <section>
            <h2 className="section-title text-center mb-8">Select Your Class</h2>
            
            <div className="resource-grid mb-12">
              {classes.map((classData) => (
                <ClassCard
                  key={classData.id}
                  id={classData.id}
                  name={classData.name}
                  description={classData.description}
                />
              ))}
            </div>
          </section>
          
          <section className="bg-education-lightGray rounded-lg p-6 mb-12">
            <h2 className="text-2xl font-semibold text-education-darkBlue mb-4">
              Why Learn with Prashant?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2 text-education-blue">Comprehensive Resources</h3>
                <p className="text-gray-600">
                  Access notes, Q&As, NCERT examples, worksheets, tests, and previous year questions.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2 text-education-blue">Well-Structured Content</h3>
                <p className="text-gray-600">
                  All content is organized by class and category for easy navigation.
                </p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2 text-education-blue">Expert-Crafted Material</h3>
                <p className="text-gray-600">
                  Materials created by education expert Prashant for optimal learning.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
