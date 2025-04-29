
export type ResourceCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  driveLink: string;
  date: string;
};

export type ClassData = {
  id: string;
  name: string;
  description: string;
  categories: ResourceCategory[];
  resources: Record<string, Resource[]>;
};

// Define resource categories that are common across classes
export const resourceCategories: ResourceCategory[] = [
  {
    id: "notes",
    name: "Notes",
    description: "Comprehensive study notes",
    icon: "file-text",
  },
  {
    id: "qa",
    name: "Question & Answers",
    description: "Practice questions with answers",
    icon: "book",
  },
  {
    id: "ncert",
    name: "NCERT Examples",
    description: "Examples from NCERT textbooks",
    icon: "book",
  },
  {
    id: "worksheets",
    name: "Worksheets",
    description: "Practice worksheets for exercises",
    icon: "file-text",
  },
  {
    id: "tests",
    name: "Tests & Answer Keys",
    description: "Sample tests with answer keys",
    icon: "file-text",
  },
  {
    id: "pyq",
    name: "Previous Year Questions",
    description: "Questions from previous years' exams",
    icon: "file-text",
  },
];

// Sample data for each class
export const classes: ClassData[] = [
  {
    id: "class-6",
    name: "Class 6",
    description: "Educational resources for Class 6 students",
    categories: resourceCategories,
    resources: {
      notes: [
        {
          id: "class6-notes-1",
          title: "Mathematics Chapter 1 Notes",
          description: "Comprehensive notes on Numbers",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-08-15",
        },
        {
          id: "class6-notes-2",
          title: "Science Chapter 1 Notes",
          description: "Food: Where Does It Come From?",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-08-20",
        },
      ],
      qa: [
        {
          id: "class6-qa-1",
          title: "English Q&A Set 1",
          description: "Practice questions on grammar",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-09-05",
        },
      ],
      ncert: [
        {
          id: "class6-ncert-1",
          title: "NCERT Solutions - Math Chapter 1",
          description: "Solutions to all examples in Chapter 1",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-07-10",
        },
      ],
      worksheets: [],
      tests: [],
      pyq: [],
    },
  },
  {
    id: "class-7",
    name: "Class 7",
    description: "Educational resources for Class 7 students",
    categories: resourceCategories,
    resources: {
      notes: [
        {
          id: "class7-notes-1",
          title: "Mathematics Chapter 1 Notes",
          description: "Integers and operations",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-08-12",
        },
      ],
      qa: [],
      ncert: [],
      worksheets: [],
      tests: [],
      pyq: [],
    },
  },
  {
    id: "class-8",
    name: "Class 8",
    description: "Educational resources for Class 8 students",
    categories: resourceCategories,
    resources: {
      notes: [],
      qa: [],
      ncert: [],
      worksheets: [],
      tests: [],
      pyq: [],
    },
  },
  {
    id: "class-9",
    name: "Class 9",
    description: "Educational resources for Class 9 students",
    categories: resourceCategories,
    resources: {
      notes: [
        {
          id: "class9-notes-1",
          title: "Science Chapter 1 Notes",
          description: "Matter in Our Surroundings",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-08-10",
        },
        {
          id: "class9-notes-2",
          title: "Mathematics Chapter 1 Notes",
          description: "Number Systems",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-08-15",
        },
      ],
      qa: [
        {
          id: "class9-qa-1",
          title: "Science Q&A Set 1",
          description: "Practice questions on Matter",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-09-01",
        },
      ],
      ncert: [
        {
          id: "class9-ncert-1",
          title: "NCERT Solutions - Science Chapter 1",
          description: "Solutions to all examples in Chapter 1",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-07-05",
        },
      ],
      worksheets: [
        {
          id: "class9-worksheet-1",
          title: "Mathematics Worksheet 1",
          description: "Practice problems on Number Systems",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-09-10",
        },
      ],
      tests: [
        {
          id: "class9-test-1",
          title: "Science Unit Test 1",
          description: "Test on Chapters 1-3 with answer key",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-09-15",
        },
      ],
      pyq: [
        {
          id: "class9-pyq-1",
          title: "Last Year Final Exam Questions",
          description: "Previous year question papers with solutions",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-07-20",
        },
      ],
    },
  },
  {
    id: "class-10",
    name: "Class 10",
    description: "Educational resources for Class 10 students",
    categories: resourceCategories,
    resources: {
      notes: [],
      qa: [],
      ncert: [],
      worksheets: [],
      tests: [],
      pyq: [],
    },
  },
  {
    id: "class-11",
    name: "Class 11",
    description: "Educational resources for Class 11 students",
    categories: resourceCategories,
    resources: {
      notes: [],
      qa: [],
      ncert: [],
      worksheets: [],
      tests: [],
      pyq: [],
    },
  },
  {
    id: "class-12",
    name: "Class 12",
    description: "Educational resources for Class 12 students",
    categories: resourceCategories,
    resources: {
      notes: [],
      qa: [],
      ncert: [],
      worksheets: [],
      tests: [],
      pyq: [],
    },
  },
];

// Helper function to find a class by ID
export const getClassById = (classId: string): ClassData | undefined => {
  return classes.find((cls) => cls.id === classId);
};

// Helper function to find resources for a specific class and category
export const getResourcesByClassAndCategory = (
  classId: string,
  categoryId: string
): Resource[] => {
  const classData = getClassById(classId);
  if (!classData) return [];
  
  return classData.resources[categoryId] || [];
};

// Helper function to get a category by ID
export const getCategoryById = (categoryId: string): ResourceCategory | undefined => {
  return resourceCategories.find((category) => category.id === categoryId);
};
