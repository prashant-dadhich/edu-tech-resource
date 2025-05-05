import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface Question {
  number: number;
  text: string;
}

const QuestionPDFGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);

  const parseQuestions = (text: string) => {
    const lines = text.split('\n');
    const parsedQuestions: Question[] = [];
    let currentQuestion: string[] = [];
    let questionNumber = 1;

    lines.forEach((line) => {
      if (line.trim().match(/^\d+\./)) {
        if (currentQuestion.length > 0) {
          parsedQuestions.push({
            number: questionNumber,
            text: currentQuestion.join('\n'),
          });
          questionNumber++;
          currentQuestion = [];
        }
      }
      currentQuestion.push(line);
    });

    if (currentQuestion.length > 0) {
      parsedQuestions.push({
        number: questionNumber,
        text: currentQuestion.join('\n'),
      });
    }

    setQuestions(parsedQuestions);
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    const columnWidth = (pageWidth - 3 * margin) / 2;
    const lineHeight = 7;
    const maxTextWidth = columnWidth - 10; // Leave some padding for text

    // Function to split text into lines that fit within the column width
    const splitTextIntoLines = (text: string, maxWidth: number): string[] => {
      const lines: string[] = [];
      const words = text.split(' ');
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const testWidth = doc.getStringUnitWidth(testLine) * doc.getFontSize() / doc.internal.scaleFactor;
        
        if (testWidth > maxWidth) {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            lines.push(word);
            currentLine = '';
          }
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }
      
      return lines;
    };

    // Function to calculate how much height a question will take
    const calculateQuestionHeight = (question: Question): number => {
      let height = lineHeight; // Start with height for question number
      
      const questionLines = question.text.split('\n');
      for (const line of questionLines) {
        if (!line.trim()) {
          height += lineHeight;
          continue;
        }
        
        const wrappedLines = splitTextIntoLines(line.trim(), maxTextWidth);
        height += wrappedLines.length * lineHeight;
      }
      
      return height + lineHeight; // Add extra space after question
    };

    let currentPage = 1;
    let leftColumnY = margin;
    let rightColumnY = margin;
    const leftColumnX = margin;
    const rightColumnX = margin + columnWidth + margin;

    // Process each question
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const questionHeight = calculateQuestionHeight(question);
      
      // Determine which column to use
      if (leftColumnY <= rightColumnY) {
        // Use left column
        // Check if question fits on current page
        if (leftColumnY + questionHeight > pageHeight - margin) {
          // Question won't fit, move to new page
          if (rightColumnY > leftColumnY) {
            // Right column has content, so start a new page
            doc.addPage();
            currentPage++;
            leftColumnY = margin;
            rightColumnY = margin;
          } else {
            // Right column is empty, move to right column
            leftColumnY = margin;
          }
        }
        
        // Add question to left column
        addQuestionToColumn(question, leftColumnX, leftColumnY);
        leftColumnY += questionHeight;
      } else {
        // Use right column
        // Check if question fits on current page
        if (rightColumnY + questionHeight > pageHeight - margin) {
          // Question won't fit, move to new page
          doc.addPage();
          currentPage++;
          leftColumnY = margin;
          rightColumnY = margin;
        }
        
        // Add question to right column
        addQuestionToColumn(question, rightColumnX, rightColumnY);
        rightColumnY += questionHeight;
      }
    }

    // Function to add a question to a specific column
    function addQuestionToColumn(question: Question, x: number, startY: number): void {
      let y = startY;
      
      // Add question number
      doc.setFontSize(12);
      doc.text(`${question.number}.`, x, y);
      y += lineHeight;

      // Process each line of the question
      const questionLines = question.text.split('\n');
      for (const line of questionLines) {
        // Skip empty lines
        if (!line.trim()) {
          y += lineHeight;
          continue;
        }

        // Split the line into multiple lines if it's too long
        const wrappedLines = splitTextIntoLines(line.trim(), maxTextWidth);
        
        for (const wrappedLine of wrappedLines) {
          doc.setFontSize(10);
          doc.text(wrappedLine, x + 10, y);
          y += lineHeight;
        }
      }
    }

    doc.save('questions.pdf');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Question PDF Generator</h2>
      <div className="mb-4">
        <textarea
          className="w-full h-64 p-2 border rounded"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            parseQuestions(e.target.value);
          }}
          placeholder="Paste your questions here (each question should start with a number followed by a dot)"
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={generatePDF}
      >
        Generate PDF
      </button>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Preview</h3>
        <div className="grid grid-cols-2 gap-4">
          {questions.map((question) => (
            <div key={question.number} className="border p-4 rounded">
              <p className="font-bold">{question.number}.</p>
              <pre className="whitespace-pre-wrap">{question.text}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPDFGenerator; 