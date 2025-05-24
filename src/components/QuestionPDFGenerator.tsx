// import React, { useState } from 'react';
// import { jsPDF } from 'jspdf';

// interface Question {
//   number: number;
//   text: string;
// }

// const QuestionPDFGenerator: React.FC = () => {
//   const [inputText, setInputText] = useState<string>('');
//   const [questions, setQuestions] = useState<Question[]>([]);

//   // Keep your existing parseQuestions function exactly as is
//   const parseQuestions = (text: string) => {
//     const lines = text.split('\n');
//     const parsedQuestions: Question[] = [];
//     let currentQuestion: string[] = [];
//     let questionNumber = 1;

//     lines.forEach((line) => {
//       if (line.trim().match(/^\d+\./)) {
//         if (currentQuestion.length > 0) {
//           parsedQuestions.push({
//             number: questionNumber,
//             text: currentQuestion.join('\n'),
//           });
//           questionNumber++;
//           currentQuestion = [];
//         }
//       }
//       currentQuestion.push(line);
//     });

//     if (currentQuestion.length > 0) {
//       parsedQuestions.push({
//         number: questionNumber,
//         text: currentQuestion.join('\n'),
//       });
//     }

//     setQuestions(parsedQuestions);
//   };

//   // REPLACE your existing generatePDF function with this optimized version:
//   const generatePDF = async () => {
//     const doc = new jsPDF();
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();

//     // Tighter layout parameters
//     const margin = 8;
//     const columnWidth = (pageWidth - 3 * margin) / 2;
//     const lineHeight = 4.8;
//     const maxTextWidth = columnWidth - 5;

//     // Set default font
//     doc.setFont('helvetica');
//     doc.setFontSize(9.8);

//     // Watermark function
//     const addWatermark = () => {
//       doc.setTextColor(210, 210, 210);
//       doc.setFontSize(48);
//       doc.text('Learn With Prashant', pageWidth / 2, pageHeight / 2, {
//         angle: 45,
//         align: 'center'
//       });
//       doc.setTextColor(0, 0, 0);
//     };

//     // Fix chemical formulas and text errors
//     const fixContent = (text: string): string => {
//       return text
//         .replace(/H₃/g, 'H₂')
//         .replace(/Na₂ZnO,/g, 'Na₂ZnO₂')
//         .replace(/NaZnO,/g, 'NaZnO₂')
//         .replace(/reauneturallise/g, 'required')
//         .replace(/neutron/g, 'neutralized');
//     };

//     // More compact question rendering
//     const renderQuestion = (question: Question, x: number, y: number): number => {
//       // Question number
//       doc.setFontSize(10.2);
//       doc.setFont(undefined, 'bold');
//       doc.text(`${question.number}.`, x, y);
//       doc.setFont(undefined, 'normal');
//       y += lineHeight * 0.8;

//       // Question text
//       doc.setFontSize(9.8);
//       const fixedText = fixContent(question.text);
//       const lines = fixedText.split('\n');

//       for (const line of lines) {
//         if (!line.trim()) {
//           y += lineHeight * 0.5;
//           continue;
//         }

//         // Smart text wrapping
//         let currentLine = '';
//         const words = line.split(' ');

//         for (const word of words) {
//           const testLine = currentLine ? `${currentLine} ${word}` : word;
//           const testWidth = doc.getStringUnitWidth(testLine) * doc.getFontSize() / doc.internal.scaleFactor;

//           if (testWidth > maxTextWidth) {
//             if (currentLine) {
//               doc.text(currentLine, x + 5, y);
//               y += lineHeight;
//               currentLine = word;
//             } else {
//               // Handle long words
//               doc.text(word.substring(0, 25), x + 5, y);
//               y += lineHeight;
//               currentLine = word.substring(25);
//             }
//           } else {
//             currentLine = testLine;
//           }
//         }

//         if (currentLine) {
//           doc.text(currentLine, x + 5, y);
//           y += lineHeight;
//         }
//       }

//       return y + lineHeight * 0.2;
//     };

//     // Start PDF generation
//     addWatermark();

//     // Prepare questions with correct numbering
//     const preparedQuestions = questions.map((q, i) => ({
//       ...q,
//       number: i + 1,
//       text: q.text.replace(/^\d+\./, '').trim() // Remove existing numbers
//     }));

//     // Distribute questions across pages and columns
//     let currentPage = 1;
//     const pages: {left: Question[], right: Question[]}[] = [{left: [], right: []}];
//     let leftY = margin;
//     let rightY = margin;

//     preparedQuestions.forEach(question => {
//       // Estimate height dynamically
//       const lineCount = question.text.split('\n').reduce((count, line) => {
//         return count + Math.ceil(line.length / 50); // Approx 50 chars per line
//       }, 0);

//       const questionHeight = lineCount * lineHeight * 0.9 + lineHeight * 1.5;

//       // Try left column first
//       if (leftY + questionHeight <= pageHeight - margin) {
//         pages[currentPage - 1].left.push(question);
//         leftY += questionHeight;
//       }
//       // Then right column
//       else if (rightY + questionHeight <= pageHeight - margin) {
//         pages[currentPage - 1].right.push(question);
//         rightY += questionHeight;
//       }
//       // New page if needed
//       else {
//         currentPage++;
//         pages.push({left: [question], right: []});
//         leftY = margin + questionHeight;
//         rightY = margin;
//       }
//     });

//     // Render all pages
//     pages.forEach(({left, right}, i) => {
//       if (i > 0) {
//         doc.addPage();
//         addWatermark();
//       }

//       // Left column
//       let y = margin;
//       left.forEach(q => y = renderQuestion(q, margin, y));

//       // Right column
//       y = margin;
//       right.forEach(q => y = renderQuestion(q, margin + columnWidth + margin, y));
//     });

//     doc.save('questions.pdf');
//   };

//   // Keep your existing return statement exactly as is
//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Question PDF Generator</h2>
//       <div className="mb-4">
//         <textarea
//           className="w-full h-64 p-2 border rounded"
//           value={inputText}
//           onChange={(e) => {
//             setInputText(e.target.value);
//             parseQuestions(e.target.value);
//           }}
//           placeholder="Paste your questions here (each question should start with a number followed by a dot)"
//         />
//       </div>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         onClick={generatePDF}
//       >
//         Generate PDF
//       </button>
//       <div className="mt-4">
//         <h3 className="text-xl font-semibold mb-2">Preview</h3>
//         <div className="grid grid-cols-2 gap-4">
//           {questions.map((question) => (
//             <div key={question.number} className="border p-4 rounded">
//               <p className="font-bold">{question.number}.</p>
//               <pre className="whitespace-pre-wrap">{question.text}</pre>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionPDFGenerator;

import React, { useState } from "react";
import { jsPDF } from "jspdf";

interface Question {
  number: number;
  text: string;
}

const QuestionPDFGenerator: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [watermarkText, setWatermarkText] = useState<string>("Learn With Prashant");
  const [headerTitle, setHeaderTitle] = useState<string>("Chemistry Questions");
  const [showPageNumbers, setShowPageNumbers] = useState<boolean>(true);
  const [pageNumberPosition, setPageNumberPosition] = useState<"top-right" | "bottom-center">("top-right");

  const parseQuestions = (text: string) => {
    const lines = text.split("\n");
    const parsedQuestions: Question[] = [];
    let currentQuestion: string[] = [];
    let questionNumber = 1;

    lines.forEach((line) => {
      if (line.trim().match(/^\d+\./)) {
        if (currentQuestion.length > 0) {
          parsedQuestions.push({
            number: questionNumber,
            text: currentQuestion.join("\n"),
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
        text: currentQuestion.join("\n"),
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
    const lineHeight = 4.8; // Slightly reduced for better density
    const maxTextWidth = columnWidth - 8;
    const headerHeight = 20; // Reduced header space

    // Set default font
    doc.setFont("helvetica");
    doc.setFontSize(9.8);

    // Enhanced watermark function
    const addWatermark = () => {
      if (!watermarkText.trim()) return;

      // Save current graphics state
      const currentTextColor = doc.getTextColor();
      const currentFontSize = doc.getFontSize();

      try {
        // Modern opacity method
        doc.setGState(new (doc as any).GState({ opacity: 0.7 }));
      } catch (e) {
        // Fallback for older versions
        console.warn("Opacity not supported, using light gray color");
      }

      doc.setTextColor(210, 210, 210);
      doc.setFontSize(48); // Smaller watermark size
      doc.text(watermarkText, pageWidth / 2, pageHeight / 2, {
        angle: 45,
        align: "center",
      });

      // Restore graphics state
      try {
        doc.setGState(new (doc as any).GState({ opacity: 1 }));
      } catch (e) {
        // Fallback
      }
      doc.setTextColor(currentTextColor);
      doc.setFontSize(currentFontSize);
    };

    // Enhanced header function
    // Header function with tighter spacing
    const addHeader = (pageNumber: number, totalPages: number) => {
      const currentFont = doc.getFont();
      const currentSize = doc.getFontSize();
      let headerSpaceUsed = 0;

      if (headerTitle.trim()) {
        doc.setFontSize(10); // Reduced from 11
        doc.setFont(currentFont.fontName, "bold");
        doc.text(headerTitle, pageWidth / 2, 10, { align: "center" }); // Moved up from 12
        doc.setFont(currentFont.fontName, "normal");
        headerSpaceUsed = 15; // Reduced from 20
      }

      if (showPageNumbers) {
        doc.setFontSize(8); // Reduced from 9
        if (pageNumberPosition === "top-right") {
          doc.text(
            `Page ${pageNumber} of ${totalPages}`,
            pageWidth - 8, // Moved in from 10
            headerTitle.trim() ? 10 : 6, // Adjusted y-position
            { align: "right" }
          );
          if (!headerTitle.trim()) {
            headerSpaceUsed = 10; // Reduced from 12
          }
        } else {
          doc.text(
            `Page ${pageNumber} of ${totalPages}`,
            pageWidth / 2,
            pageHeight - 6, // Moved up from 8
            { align: "center" }
          );
        }
      }

      doc.setFont(currentFont.fontName, currentFont.fontStyle);
      doc.setFontSize(currentSize);

      return headerSpaceUsed;
    };

    // Enhanced content fixing with proper chemical formatting
    const fixContent = (text: string): string => {
      return (
        text
          // Fix chemical formulas
          .replace(/NaZ?ZnO2/g, "Na₂ZnO₂") // Fix sodium zincate
          .replace(/H2([^₀₁₂₃₄₅₆₇₈₉])/g, "H₂$1") // Fix hydrogen gas
          // Fix common typos
          .replace(/neutron/g, "neutralized")
          .replace(/reauneturallise/g, "required")
          .replace(/reannaturalise/g, "neutralize")
          // Fix spacing in options
          .replace(/\(([a-d])\)\s+/g, "($1) ")
      );
    };

    // More compact question height calculation
    const calculateQuestionHeight = (question: Question): number => {
      const fixedText = fixContent(question.text);
      let height = lineHeight * 0.9; // Reduced from 1.2

      const lines = fixedText.split("\n");
      for (const line of lines) {
        if (!line.trim()) {
          height += lineHeight * 0.2; // Reduced from 0.3
          continue;
        }

        const lineWidth = (doc.getStringUnitWidth(line) * doc.getFontSize()) / doc.internal.scaleFactor;
        height += Math.ceil(lineWidth / maxTextWidth) * lineHeight;
      }

      return height + lineHeight * 0.1; // Reduced from 0.2
    };

    // More compact question rendering
    const renderQuestion = (question: Question, x: number, y: number): number => {
      const fixedText = fixContent(question.text);

      // Question number
      doc.setFontSize(9.5); // Reduced from 10
      doc.setFont(undefined, "bold");
      doc.text(`${question.number}.`, x, y);
      doc.setFont(undefined, "normal");
      y += lineHeight * 0.7; // Reduced from 0.9

      // Question text with proper wrapping
      doc.setFontSize(9); // Reduced from 9.5
      const lines = fixedText.split("\n");

      for (const line of lines) {
        if (!line.trim()) {
          y += lineHeight * 0.2; // Reduced from 0.3
          continue;
        }

        // Split long lines into multiple lines if needed
        const words = line.split(" ");
        let currentLine = "";

        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = (doc.getStringUnitWidth(testLine) * doc.getFontSize()) / doc.internal.scaleFactor;

          if (testWidth > maxTextWidth) {
            if (currentLine) {
              doc.text(currentLine, x + 4, y); // Moved in from 5
              y += lineHeight;
              currentLine = word;
            } else {
              // Handle very long words (like chemical formulas)
              const chunks = [];
              for (let i = 0; i < word.length; i += 22) {
                // Increased from 20
                chunks.push(word.substring(i, i + 22));
              }
              for (let i = 0; i < chunks.length - 1; i++) {
                doc.text(chunks[i], x + 4, y);
                y += lineHeight;
              }
              currentLine = chunks[chunks.length - 1];
            }
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine) {
          doc.text(currentLine, x + 4, y);
          y += lineHeight;
        }
      }

      return y + lineHeight * 0.1; // Reduced from 0.2
    };

    // Start PDF generation
    addWatermark();

    // Prepare questions with correct numbering and fixed content
    const preparedQuestions = questions.map((q, i) => ({
      ...q,
      number: i + 1,
      text: q.text.replace(/^\d+\./, "").trim(), // Remove existing numbers
      height: calculateQuestionHeight({ ...q, number: i + 1 }),
    }));

    // New optimized question distribution algorithm
    const pages: Array<{
      left: Question[];
      right: Question[];
      leftHeight: number;
      rightHeight: number;
    }> = [];

    // Initialize first page with header space
    const initialHeaderSpace = addHeader(1, 0);
    pages.push({
      left: [],
      right: [],
      leftHeight: margin + initialHeaderSpace,
      rightHeight: margin + initialHeaderSpace,
    });

    preparedQuestions.forEach((question) => {
      let placed = false;

      // Try to place in existing pages first (including previous pages)
      for (let i = pages.length - 1; i >= 0 && !placed; i--) {
        const page = pages[i];

        // Try left column first
        if (page.leftHeight + question.height <= pageHeight - margin) {
          page.left.push(question);
          page.leftHeight += question.height;
          placed = true;
        }
        // Then try right column
        else if (page.rightHeight + question.height <= pageHeight - margin) {
          page.right.push(question);
          page.rightHeight += question.height;
          placed = true;
        }
      }

      // If couldn't place in existing pages, create new page
      if (!placed) {
        const newHeaderSpace = addHeader(pages.length + 1, 0);
        pages.push({
          left: [question],
          right: [],
          leftHeight: margin + newHeaderSpace + question.height,
          rightHeight: margin + newHeaderSpace,
        });
      }
    });

    // Calculate total pages
    const totalPages = pages.length;

    // Render all pages
    pages.forEach(({ left, right }, pageIndex) => {
      if (pageIndex > 0) {
        doc.addPage();
        addWatermark();
      }

      const headerSpaceUsed = addHeader(pageIndex + 1, totalPages);

      // Render left column
      let y = margin + headerSpaceUsed;
      left.forEach((q) => {
        y = renderQuestion(q, margin, y);
      });

      // Render right column
      y = margin + headerSpaceUsed;
      right.forEach((q) => {
        y = renderQuestion(q, margin + columnWidth + margin, y);
      });
    });

    doc.save("quesiton.pdf");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Question PDF Generator</h2>

      {/* Enhanced Customization Options */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="text-lg font-semibold mb-3">PDF Customization</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Watermark Text</label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Leave blank to disable watermark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Header Title</label>
            <input
              type="text"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Document title"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="pageNumbers"
              checked={showPageNumbers}
              onChange={(e) => setShowPageNumbers(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="pageNumbers" className="text-sm font-medium">
              Show Page Numbers
            </label>
          </div>

          {showPageNumbers && (
            <div>
              <label className="block text-sm font-medium mb-1">Page Number Position</label>
              <select value={pageNumberPosition} onChange={(e) => setPageNumberPosition(e.target.value as any)} className="w-full p-2 border rounded">
                <option value="top-right">Top Right</option>
                <option value="bottom-center">Bottom Center</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Question Input with Better Instructions */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Questions</label>
        <textarea
          className="w-full h-64 p-2 border rounded"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            parseQuestions(e.target.value);
          }}
          placeholder={`Paste your questions here (format:)\n1. Question text...\n   (a) Option 1\n   (b) Option 2\n2. Next question...`}
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors" onClick={generatePDF}>
        Generate PDF
      </button>

      {/* Enhanced Preview */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Preview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((question) => (
            <div key={question.number} className="border p-4 rounded bg-white shadow-sm">
              <p className="font-bold text-blue-600">{question.number}.</p>
              <pre className="whitespace-pre-wrap font-sans text-sm mt-1">{question.text}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionPDFGenerator;
