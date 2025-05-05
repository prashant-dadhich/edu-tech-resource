import React from 'react';
import QuestionPDFGenerator from '@/components/QuestionPDFGenerator';

const QuestionPDFGeneratorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Question PDF Generator</h1>
        <QuestionPDFGenerator />
      </div>
    </div>
  );
};

export default QuestionPDFGeneratorPage; 