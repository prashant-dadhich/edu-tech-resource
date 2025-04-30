
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EducatorProfile from '../components/EducatorProfile';
import { ExternalLink } from 'lucide-react';
import { 
  getClassById, 
  getCategoryById, 
  getChaptersByCategory,
} from '../data/classData';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '../components/ui/card';

const CategoryChapters: React.FC = () => {
  const { classId, categoryId } = useParams<{ classId: string; categoryId: string }>();
  const classData = classId ? getClassById(classId) : undefined;
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  const chapters = categoryId ? getChaptersByCategory(categoryId) : [];

  if (!classData || !category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="page-container">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold text-red-600 mb-4">
                Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Sorry, the resource you're looking for doesn't exist.
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
            <Link to={`/class/${classId}`}>{classData.name}</Link>
            <span className="divider">/</span>
            <span>{category.name}</span>
          </div>
          
          <div className="mb-10">
            <h1 className="page-title">{category.name} for {classData.name}</h1>
            <p className="text-lg text-gray-600 max-w-4xl">
              Select a chapter below to access drive resources for {category.name}.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {chapters.map((chapter) => (
              <Card key={chapter.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-education-darkBlue">{chapter.title}</CardTitle>
                  <CardDescription>{category.name} for this chapter</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Access complete {category.name.toLowerCase()} for this chapter.</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <a 
                    href={chapter.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-education-blue hover:bg-education-darkBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-education-blue"
                  >
                    Open Google Drive
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardFooter>
              </Card>
            ))}

            {chapters.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <h2 className="text-2xl font-bold text-gray-600 mb-4">No Chapters Available</h2>
                <p className="text-lg text-gray-500">
                  There are no chapters available for this category yet.
                </p>
              </div>
            )}
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

export default CategoryChapters;
