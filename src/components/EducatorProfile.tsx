
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { GraduationCap, BookOpen, UserCheck } from 'lucide-react';
import { educatorData } from '../data/educatorData';

const EducatorProfile: React.FC = () => {
  const { name, image, title, background, experience, education, compatibility } = educatorData;

  return (
    <section className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        {/* Educator Image Section */}
        <div className="md:w-1/3 bg-education-darkBlue flex flex-col items-center justify-center py-8 px-4">
          <Avatar className="h-36 w-36 border-4 border-white mb-4">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-education-blue text-2xl font-bold text-white">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold text-white text-center">{name}</h2>
          <p className="text-education-lightGray text-center">{title}</p>
        </div>

        {/* Educator Info Section */}
        <div className="md:w-2/3 p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-education-darkBlue mb-2">About the Educator</h3>
            <p className="text-gray-600">{background}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-education-blue" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{experience} years of teaching</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-education-blue" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{education}</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <UserCheck className="mr-2 h-5 w-5 text-education-blue" />
                  Compatibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{compatibility}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducatorProfile;
