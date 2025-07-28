export type Chapter = {
  id: string;
  title: string;
  driveLink: string;
};

export type ResourceCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  chapters?: Chapter[];
};

export type Resource = {
  id: string;
  title: string;
  description: string;
  driveLink: string;
  date: string;
  chapterId?: string; // Reference to a specific chapter
};

export type ClassData = {
  id: string;
  name: string;
  description: string;
  categories: ResourceCategory[];
  resources: Record<string, Resource[]>;
};

// Define chapters by class for the notes category
const class6NotesChapters: Chapter[] = [
  {
    id: "food",
    title: "1. Food: Where Does It Come From?",
    driveLink: "https://drive.google.com/drive/folders/class6-food",
  },
  {
    id: "components",
    title: "2. Components of Food",
    driveLink: "https://drive.google.com/drive/folders/class6-components",
  },
  {
    id: "fibre",
    title: "3. Fibre to Fabric",
    driveLink: "https://drive.google.com/drive/folders/class6-fibre",
  },
  {
    id: "sorting",
    title: "4. Sorting Materials into Groups",
    driveLink: "https://drive.google.com/drive/folders/class6-sorting",
  },
];

const class7NotesChapters: Chapter[] = [
  {
    id: "nutrition",
    title: "1. Nutrition in Plants",
    driveLink: "https://drive.google.com/drive/folders/class7-nutrition",
  },
  {
    id: "animals",
    title: "2. Nutrition in Animals",
    driveLink: "https://drive.google.com/drive/folders/class7-animals",
  },
  {
    id: "fibre",
    title: "3. Fibre to Fabric",
    driveLink: "https://drive.google.com/drive/folders/class7-fibre",
  },
];

const class9NotesChapters: Chapter[] = [
  {
    id: "matter-surroundings",
    title: "1. Matter in Our Surroundings",
    driveLink:
      "https://drive.google.com/file/d/1juymyywLoEfZ-i5mgRFqo40JNgxLhi9t/view?usp=drivesdk",
  },
  // { id: "matter-pure", title: "2. Is Matter Around Us Pure?", driveLink: "https://drive.google.com/drive/folders/class9-pure" },
  // { id: "atoms-molecules", title: "3. Atoms and Molecules", driveLink: "https://drive.google.com/drive/folders/class9-atoms" },
  // { id: "structure-atom", title: "4. Structure of Atom", driveLink: "https://drive.google.com/drive/folders/class9-structure" },
  {
    id: "cell",
    title: "5. Cell",
    driveLink:
      "https://drive.google.com/file/d/1k2kWSwj83YPb-VaooFHW_eIOrs0vl4Mv/view?usp=drivesdk",
  },
  // { id: "tissue", title: "6. Tissue", driveLink: "https://drive.google.com/drive/folders/class9-tissue" },
  {
    id: "motion",
    title: "7. Motion",
    driveLink:
      "https://drive.google.com/file/d/1k9eX7SzdYH2wLkPmb10NuQeM6aXqcIzz/view?usp=drivesdk",
  },
  {
    id: "force-laws",
    title: "8. Force and Laws of Motion",
    driveLink:
      "https://drive.google.com/file/d/1DwY5Vfr0E3CxJuZ6l4wf70y_fJR2_F6-/view?usp=drivesdk",
  },
  // { id: "gravitation", title: "9. Gravitation", driveLink: "https://drive.google.com/drive/folders/class9-gravitation" },
  // { id: "work-energy", title: "10. Work and Energy", driveLink: "https://drive.google.com/drive/folders/class9-energy" },
  // { id: "sound", title: "11. Sound", driveLink: "https://drive.google.com/drive/folders/class9-sound" },
  // { id: "food-resources", title: "12. Food Resources and Development", driveLink: "https://drive.google.com/drive/folders/class9-food" },
];

// class-10
// 1. Chemical reactions and equation
// 2. Acid bases and salts
// 3. Metals and nonmetals
// 4. Carbon and its compounds
// 5. Life processes
// 6. Control and coordination
// 7. Reproduction in organisms
// 8. Heredity
// 9. Light reflection and refraction
// 10. Human eye and colourful world
// 11. Electricity
// 12. Magnetic fields of electric current
// 13. Our environment
const class10NotesChapters: Chapter[] = [
  {
    id: "chemical-reactions",
    title: "1. Chemical Reactions and Equations",
    driveLink:
      "https://drive.google.com/file/d/1kJUbvYklLVId_FLuPLRrGg_1zqNSGkvK/view?usp=drivesdk",
  },
  {
    id: "acids-bases",
    title: "2. Acids, Bases and Salts",
    driveLink:
      "https://drive.google.com/file/d/1DxAS4_fSzdM4HIXTVhuAceUJAoAJBVEH/view?usp=drivesdk",
  },
  // { id: "metals-nonmetals", title: "3. Metals and Non-metals", driveLink: "https://drive.google.com/drive/folders/class10-metals" },
  {
    id: "life-processes",
    title: "5. Life processes",
    driveLink:
      "https://drive.google.com/file/d/1kKMYc38Rln6KnDCwgZoIV7S4hJGQF7c1/view?usp=drivesdk",
  },
  {
    id: "light",
    title: "9. Light reflection and refraction",
    driveLink: "https://drive.google.com/drive/folders/class10-metals",
  },
];

// Define chapters by class for the Q&A category
const class6QAChapters: Chapter[] = [
  {
    id: "qa-food",
    title: "1. Food: Where Does It Come From?",
    driveLink: "https://drive.google.com/drive/folders/class6-qa-food",
  },
  {
    id: "qa-components",
    title: "2. Components of Food",
    driveLink: "https://drive.google.com/drive/folders/class6-qa-components",
  },
];

const class9QAChapters: Chapter[] = [
  // { id: "qa-matter-surroundings", title: "1. Matter in Our Surroundings", driveLink: "https://drive.google.com/drive/folders/class9-qa-matter" },
  // { id: "qa-matter-pure", title: "2. Is Matter Around Us Pure?", driveLink: "https://drive.google.com/drive/folders/class9-qa-pure" },
  // { id: "qa-atoms-molecules", title: "3. Atoms and Molecules", driveLink: "https://drive.google.com/drive/folders/class9-qa-atoms" },
];

// Class-specific resource categories
const getClassCategories = (classId: string): ResourceCategory[] => {
  // Base categories without chapters
  const baseCategories: ResourceCategory[] = [
    {
      id: "notes",
      name: "Notes",
      description: "Comprehensive study notes",
      icon: "file-text",
      chapters: [],
    },
    {
      id: "qa",
      name: "Question & Answers",
      description: "Practice questions with answers",
      icon: "book",
      chapters: [],
    },
    {
      id: "ncert",
      name: "NCERT Examples",
      description: "Examples from NCERT textbooks",
      icon: "book",
      chapters: [],
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

  // Assign class-specific chapters
  switch (classId) {
    case "class-6":
      baseCategories[0].chapters = class6NotesChapters;
      baseCategories[1].chapters = class6QAChapters;
      break;
    case "class-7":
      baseCategories[0].chapters = class7NotesChapters;
      break;
    case "class-9":
      baseCategories[0].chapters = class9NotesChapters;
      baseCategories[1].chapters = class9QAChapters;
      break;
    case "class-10":
      baseCategories[0].chapters = class10NotesChapters;
      break;
    default:
      break;
  }

  return baseCategories;
};

// Sample data for each class
export const classes: ClassData[] = [
  // {
  //   id: "class-6",
  //   name: "Class 6",
  //   description: "Educational resources for Class 6 students",
  //   categories: getClassCategories("class-6"),
  //   resources: {
  //     notes: [
  //       {
  //         id: "class6-notes-1",
  //         title: "Mathematics Chapter 1 Notes",
  //         description: "Comprehensive notes on Numbers",
  //         driveLink: "https://drive.google.com/drive/folders/sample-link",
  //         date: "2023-08-15",
  //       },
  //       {
  //         id: "class6-notes-2",
  //         title: "Science Chapter 1 Notes",
  //         description: "Food: Where Does It Come From?",
  //         driveLink: "https://drive.google.com/drive/folders/sample-link",
  //         date: "2023-08-20",
  //       },
  //     ],
  //     qa: [
  //       {
  //         id: "class6-qa-1",
  //         title: "English Q&A Set 1",
  //         description: "Practice questions on grammar",
  //         driveLink: "https://drive.google.com/drive/folders/sample-link",
  //         date: "2023-09-05",
  //       },
  //     ],
  //     ncert: [
  //       {
  //         id: "class6-ncert-1",
  //         title: "NCERT Solutions - Math Chapter 1",
  //         description: "Solutions to all examples in Chapter 1",
  //         driveLink: "https://drive.google.com/drive/folders/sample-link",
  //         date: "2023-07-10",
  //       },
  //     ],
  //     worksheets: [],
  //     tests: [],
  //     pyq: [],
  //   },
  // },
  // {
  //   id: "class-7",
  //   name: "Class 7",
  //   description: "Educational resources for Class 7 students",
  //   categories: getClassCategories("class-7"),
  //   resources: {
  //     notes: [
  //       {
  //         id: "class7-notes-1",
  //         title: "Mathematics Chapter 1 Notes",
  //         description: "Integers and operations",
  //         driveLink: "https://drive.google.com/drive/folders/sample-link",
  //         date: "2023-08-12",
  //       },
  //     ],
  //     qa: [],
  //     ncert: [],
  //     worksheets: [],
  //     tests: [],
  //     pyq: [],
  //   },
  // },
  // {
  //   id: "class-8",
  //   name: "Class 8",
  //   description: "Educational resources for Class 8 students",
  //   categories: getClassCategories("class-8"),
  //   resources: {
  //     notes: [],
  //     qa: [],
  //     ncert: [],
  //     worksheets: [],
  //     tests: [],
  //     pyq: [],
  //   },
  // },
  {
    id: "class-9",
    name: "Class 9",
    description: "Educational resources for Class 9 students",
    categories: getClassCategories("class-9"),
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
        // {
        //   id: "class9-qa-1",
        //   title: "Science Q&A Set 1",
        //   description: "Practice questions on Matter",
        //   driveLink: "https://drive.google.com/drive/folders/sample-link",
        //   date: "2023-09-01",
        // },
      ],
      ncert: [
        // {
        //   id: "class9-ncert-1",
        //   title: "NCERT Solutions - Science Chapter 1",
        //   description: "Solutions to all examples in Chapter 1",
        //   driveLink: "https://drive.google.com/drive/folders/sample-link",
        //   date: "2023-07-05",
        // },
      ],
      worksheets: [
        // {
        //   id: "class9-worksheet-1",
        //   title: "Mathematics Worksheet 1",
        //   description: "Practice problems on Number Systems",
        //   driveLink: "https://drive.google.com/drive/folders/sample-link",
        //   date: "2023-09-10",
        // },
      ],
      tests: [
        // {
        //   id: "class9-test-1",
        //   title: "Science Unit Test 1",
        //   description: "Test on Chapters 1-3 with answer key",
        //   driveLink: "https://drive.google.com/drive/folders/sample-link",
        //   date: "2023-09-15",
        // },
      ],
      pyq: [
        // {
        //   id: "class9-pyq-1",
        //   title: "Last Year Final Exam Questions",
        //   description: "Previous year question papers with solutions",
        //   driveLink: "https://drive.google.com/drive/folders/sample-link",
        //   date: "2023-07-20",
        // },
      ],
    },
  },
  {
    id: "class-10",
    name: "Class 10",
    description: "Educational resources for Class 10 students",
    categories: getClassCategories("class-10"),
    resources: {
      notes: [
        {
          id: "class10-notes-1",
          title: "Science Chapter 1 Notes",
          description: "Matter in Our Surroundings",
          driveLink: "https://drive.google.com/drive/folders/sample-link",
          date: "2023-08-10",
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
    id: "class-11",
    name: "Class 11",
    description: "Educational resources for Class 11 students",
    categories: getClassCategories("class-11"),
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
    categories: getClassCategories("class-12"),
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
export const getCategoryById = (
  categoryId: string
): ResourceCategory | undefined => {
  // Look for the category across all classes
  for (const classData of classes) {
    const category = classData.categories.find((cat) => cat.id === categoryId);
    if (category) return category;
  }
  return undefined;
};

// Helper function to get chapters for a category
export const getChaptersByCategory = (classId: string): ResourceCategory[] => {
  const category = getClassCategories(classId);
  return category || [];
};
