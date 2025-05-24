import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

interface Question {
  number: number;
  text: string;
}

const QuestionPDFGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [questions, setQuestions] = useState<Question[]>([]);

  // Keep your existing parseQuestions function exactly as is
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

  // REPLACE your existing generatePDF function with this optimized version:
  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Tighter layout parameters
    const margin = 8;
    const columnWidth = (pageWidth - 3 * margin) / 2;
    const lineHeight = 4.8;
    const maxTextWidth = columnWidth - 5;

    // Set default font
    doc.setFont('helvetica');
    doc.setFontSize(9.8);

    // Watermark function
    const addWatermark = () => {
      doc.setTextColor(210, 210, 210);
      doc.setFontSize(48);
      doc.text('Learn With Prashant', pageWidth / 2, pageHeight / 2, {
        angle: 45,
        align: 'center'
      });
      doc.setTextColor(0, 0, 0);
    };

    // Fix chemical formulas and text errors
    const fixContent = (text: string): string => {
      return text
        .replace(/H₃/g, 'H₂')
        .replace(/Na₂ZnO,/g, 'Na₂ZnO₂')
        .replace(/NaZnO,/g, 'NaZnO₂')
        .replace(/reauneturallise/g, 'required')
        .replace(/neutron/g, 'neutralized');
    };

    // More compact question rendering
    const renderQuestion = (question: Question, x: number, y: number): number => {
      // Question number
      doc.setFontSize(10.2);
      doc.setFont(undefined, 'bold');
      doc.text(`${question.number}.`, x, y);
      doc.setFont(undefined, 'normal');
      y += lineHeight * 0.8;

      // Question text
      doc.setFontSize(9.8);
      const fixedText = fixContent(question.text);
      const lines = fixedText.split('\n');
      
      for (const line of lines) {
        if (!line.trim()) {
          y += lineHeight * 0.5;
          continue;
        }
        
        // Smart text wrapping
        let currentLine = '';
        const words = line.split(' ');
        
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = doc.getStringUnitWidth(testLine) * doc.getFontSize() / doc.internal.scaleFactor;
          
          if (testWidth > maxTextWidth) {
            if (currentLine) {
              doc.text(currentLine, x + 5, y);
              y += lineHeight;
              currentLine = word;
            } else {
              // Handle long words
              doc.text(word.substring(0, 25), x + 5, y);
              y += lineHeight;
              currentLine = word.substring(25);
            }
          } else {
            currentLine = testLine;
          }
        }
        
        if (currentLine) {
          doc.text(currentLine, x + 5, y);
          y += lineHeight;
        }
      }

      return y + lineHeight * 0.2;
    };

    // Start PDF generation
    addWatermark();

    // Prepare questions with correct numbering
    const preparedQuestions = questions.map((q, i) => ({
      ...q,
      number: i + 1,
      text: q.text.replace(/^\d+\./, '').trim() // Remove existing numbers
    }));

    // Distribute questions across pages and columns
    let currentPage = 1;
    const pages: {left: Question[], right: Question[]}[] = [{left: [], right: []}];
    let leftY = margin;
    let rightY = margin;

    preparedQuestions.forEach(question => {
      // Estimate height dynamically
      const lineCount = question.text.split('\n').reduce((count, line) => {
        return count + Math.ceil(line.length / 50); // Approx 50 chars per line
      }, 0);
      
      const questionHeight = lineCount * lineHeight * 0.9 + lineHeight * 1.5;

      // Try left column first
      if (leftY + questionHeight <= pageHeight - margin) {
        pages[currentPage - 1].left.push(question);
        leftY += questionHeight;
      } 
      // Then right column
      else if (rightY + questionHeight <= pageHeight - margin) {
        pages[currentPage - 1].right.push(question);
        rightY += questionHeight;
      } 
      // New page if needed
      else {
        currentPage++;
        pages.push({left: [question], right: []});
        leftY = margin + questionHeight;
        rightY = margin;
      }
    });

    // Render all pages
    pages.forEach(({left, right}, i) => {
      if (i > 0) {
        doc.addPage();
        addWatermark();
      }

      // Left column
      let y = margin;
      left.forEach(q => y = renderQuestion(q, margin, y));

      // Right column
      y = margin;
      right.forEach(q => y = renderQuestion(q, margin + columnWidth + margin, y));
    });

    doc.save('questions.pdf');
  };

  // Keep your existing return statement exactly as is
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