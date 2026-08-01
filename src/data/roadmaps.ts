import type { CourseInfo, CourseId, RoadmapPhase } from '@/types';

export const COURSES: CourseInfo[] = [
  {
    id: '10th',
    name: '10th Grade',
    fullName: 'Class 10 — CBSE / SSC',
    category: 'school',
    description: 'Complete foundation roadmap for board exam success.',
    theme: 'green',
    icon: 'School',
  },
  {
    id: '12th',
    name: '12th Grade',
    fullName: 'Class 12 — CBSE / HSC',
    category: 'school',
    description: 'Board + entrance exam mastery roadmap.',
    theme: 'green',
    icon: 'GraduationCap',
  },
  {
    id: 'btech',
    name: 'B.Tech',
    fullName: 'Bachelor of Technology',
    category: 'degree',
    description: 'Engineering journey from foundations to specialization.',
    theme: 'orange',
    icon: 'Cpu',
  },
  {
    id: 'be',
    name: 'B.E.',
    fullName: 'Bachelor of Engineering',
    category: 'degree',
    description: 'Core engineering roadmap with project-based learning.',
    theme: 'orange',
    icon: 'Wrench',
  },
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    category: 'degree',
    description: 'Software development & IT career roadmap.',
    theme: 'orange',
    icon: 'Code2',
  },
  {
    id: 'bcom',
    name: 'B.Com',
    fullName: 'Bachelor of Commerce',
    category: 'degree',
    description: 'Accounting, finance & business management roadmap.',
    theme: 'orange',
    icon: 'Calculator',
  },
  {
    id: 'bsc',
    name: 'B.Sc',
    fullName: 'Bachelor of Science',
    category: 'degree',
    description: 'Pure sciences & research-oriented roadmap.',
    theme: 'orange',
    icon: 'FlaskConical',
  },
];

export const SCHOOL_COURSES = COURSES.filter((c) => c.category === 'school');
export const DEGREE_COURSES = COURSES.filter((c) => c.category === 'degree');

export function getCourse(id: CourseId): CourseInfo | undefined {
  return COURSES.find((c) => c.id === id);
}

export const ROADMAPS: Record<CourseId, RoadmapPhase[]> = {
  '10th': [
    {
      phase: 'Phase 1',
      title: 'Foundation & NCERT Mastery',
      duration: 'Months 1-3',
      goal: 'Complete all NCERT chapters across 5 core subjects.',
      subjects: [
        {
          name: 'Mathematics',
          topics: ['Real Numbers', 'Polynomials', 'Pair of Linear Equations', 'Quadratic Equations', 'Arithmetic Progressions'],
          resources: ['NCERT Math textbook', 'Khan Academy - Algebra basics', 'Cuemath practice sheets'],
        },
        {
          name: 'Science (Physics/Chem/Bio)',
          topics: ['Chemical Reactions', 'Acids Bases & Salts', 'Life Processes', 'Light Reflection & Refraction', 'Electricity'],
          resources: ['NCERT Science textbook', 'Magnet Brains YouTube', 'Byjus concept videos'],
        },
        {
          name: 'Social Science',
          topics: ['Nationalism in India', 'Resources & Development', 'Power Sharing', 'Money & Credit', 'Globalization'],
          resources: ['NCERT History/Civics/Economics/Geography', 'Toppr study guides'],
        },
        {
          name: 'English',
          topics: ['First Flight (prose)', 'Footprints Without Feet', 'Grammar - Tenses & Modals', 'Writing - Letters & Essays'],
          resources: ['NCERT English', 'CBSE sample papers', 'English grammar apps'],
        },
        {
          name: 'Hindi / Second Language',
          topics: ['Kshitij (prose)', 'Kritika', 'Grammar - Ras & Alankar', 'Writing skills'],
          resources: ['NCERT Hindi textbook', 'Hindi grammar workbooks'],
        },
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Deep Practice & Concept Building',
      duration: 'Months 4-6',
      goal: 'Solve reference books and previous year questions.',
      subjects: [
        {
          name: 'Mathematics',
          topics: ['Triangles', 'Coordinate Geometry', 'Trigonometry', 'Circles', 'Surface Areas & Volumes', 'Statistics & Probability'],
          resources: ['RD Sharma / RS Aggarwal', 'Previous 10 year papers', 'Vedantu live classes'],
        },
        {
          name: 'Science',
          topics: ['Magnetic Effects of Current', 'Sources of Energy', 'Heredity & Evolution', 'Our Environment', 'Management of Natural Resources'],
          resources: ['Lakhmir Singh', 'Previous year board papers', 'Practical record work'],
        },
        {
          name: 'Social Science',
          topics: ['Nationalism in Europe', 'Print Culture', 'Agriculture', 'Minerals & Energy Resources', 'Outcomes of Democracy'],
          resources: ['Full Marks guide', 'Case study practice'],
        },
        {
          name: 'English',
          topics: ['The Diary of a Young Girl', 'Glimpses of India', 'The Hundred Dresses', 'Analytical paragraphs'],
          resources: ['BBC Compacta', 'Unseen passages practice'],
        },
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Revision & Board Exam Sprint',
      duration: 'Months 7-9',
      goal: 'Full mock tests, sample papers, and weak-area targeting.',
      subjects: [
        {
          name: 'All Subjects',
          topics: ['CBSE Sample Papers (latest)', 'Previous 10-year board papers', 'Time-bound mock tests', 'Revision notes', 'Map work (Social Science)'],
          resources: ['CBSE official sample papers', 'Arihant sample papers', ' Oswaal question banks'],
        },
        {
          name: 'Exam Strategy',
          topics: ['Presentation & handwriting', 'Time management per section', 'Diagram practice', 'Internal assessment completion'],
          resources: ['Toppers answer sheet analysis', 'School pre-board exams'],
        },
      ],
    },
  ],
  '12th': [
    {
      phase: 'Phase 1',
      title: 'NCERT Foundation & Stream Basics',
      duration: 'Months 1-3',
      goal: 'Complete full NCERT syllabus for chosen stream.',
      subjects: [
        {
          name: 'Physics',
          topics: ['Electric Charges & Fields', 'Electrostatic Potential & Capacitance', 'Current Electricity', 'Moving Charges & Magnetism'],
          resources: ['NCERT Physics Part 1', 'HC Verma concepts', 'Physics Wallah lectures'],
        },
        {
          name: 'Chemistry',
          topics: ['Solutions', 'Electrochemistry', 'Chemical Kinetics', 'The p-Block Elements', 'Haloalkanes & Haloarenes'],
          resources: ['NCERT Chemistry', 'VK Jaiswal videos', 'Concept maps'],
        },
        {
          name: 'Biology',
          topics: ['Reproduction in Organisms', 'Genetics & Inheritance', 'Molecular Basis of Inheritance', 'Human Reproduction'],
          resources: ['NCERT Biology', 'Vipin Sharma lectures', 'Diagrams notebook'],
        },
        {
          name: 'Mathematics',
          topics: ['Relations & Functions', 'Inverse Trigonometry', 'Matrices & Determinants', 'Continuity & Differentiability'],
          resources: ['NCERT Math Part 1', 'RD Sharma', 'Neha Agrawal Mathematically Inclined'],
        },
        {
          name: 'Accountancy / Economics / CS',
          topics: ['Partnership Accounts', 'Analysis of Financial Statements', 'Microeconomics', 'Statistics'],
          resources: ['NCERT Accountancy', 'Sandeep Garg Economics', 'Rajat Arora classes'],
        },
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Advanced Practice & Entrance Prep',
      duration: 'Months 4-6',
      goal: 'Reference books + entrance exam (JEE/NEET/CUET) prep.',
      subjects: [
        {
          name: 'Physics',
          topics: ['Magnetism & Matter', 'EM Induction', 'AC Current', 'Ray Optics', 'Wave Optics', 'Dual Nature & Atoms'],
          resources: ['DC Pandey', 'Previous year JEE/NEET papers', 'Mock test series'],
        },
        {
          name: 'Chemistry',
          topics: ['Alcohols Phenols Ethers', 'Aldehydes Ketones', 'Biomolecules', 'Coordination Compounds', 'd & f Block'],
          resources: ['MS Chauhan (Organic)', 'N Awasthi (Physical)', 'Previous year papers'],
        },
        {
          name: 'Biology',
          topics: ['Evolution', 'Human Health & Disease', 'Biotechnology', 'Ecology & Environment', 'Biodiversity'],
          resources: ['Trueman Biology', 'Allen modules', 'NEET previous papers'],
        },
        {
          name: 'Mathematics',
          topics: ['Application of Derivatives', 'Integrals', 'Differential Equations', 'Vector Algebra', '3D Geometry', 'Probability'],
          resources: ['Cengage series', 'JEE previous papers', 'CUET prep books'],
        },
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Board Revision & Final Sprint',
      duration: 'Months 7-9',
      goal: 'Board exam mastery + entrance exam final attempt.',
      subjects: [
        {
          name: 'All Subjects',
          topics: ['CBSE sample papers', 'Previous 10-year board papers', 'Full mock tests', 'Practical exam preparation', 'Revision notes'],
          resources: ['CBSE official samples', 'Arihant/Oswaal', 'School pre-boards'],
        },
        {
          name: 'Entrance Exam',
          topics: ['JEE Main / NEET / CUET mock series', 'Topic-wise weightage revision', 'Doubt clearing sessions', 'Test analysis'],
          resources: ['NTA Abhyas app', 'Allen/Akash test series', 'Unacademy mocks'],
        },
      ],
    },
  ],
  btech: [
    {
      phase: 'Year 1',
      title: 'Engineering Foundation',
      duration: 'Semester 1-2',
      goal: 'Build strong fundamentals in math, science & programming.',
      subjects: [
        {
          name: 'Core',
          topics: ['Engineering Mathematics (Calculus & Linear Algebra)', 'Engineering Physics', 'Engineering Chemistry', 'Programming in C', 'Engineering Graphics'],
          resources: ['NPTEL courses', 'B.Tech first year textbooks', 'GeeksforGeeks'],
        },
        {
          name: 'Skills',
          topics: ['Basic coding practice', 'Communication skills', 'Workshop & lab work'],
          resources: ['HackerRank (C basics)', 'English communication labs'],
        },
      ],
    },
    {
      phase: 'Year 2',
      title: 'Core Branch Subjects',
      duration: 'Semester 3-4',
      goal: 'Master core branch subjects and data structures.',
      subjects: [
        {
          name: 'CS/IT',
          topics: ['Data Structures & Algorithms', 'OOP (Java/C++)', 'DBMS', 'Operating Systems basics', 'Digital Logic Design'],
          resources: ['DSA sheet by Striver', 'Gate Smashers YouTube', 'Neso Academy'],
        },
        {
          name: 'Electronics/Mech',
          topics: ['Circuit Theory', 'Thermodynamics', 'Strength of Materials', 'Machine Drawing', 'Analog Electronics'],
          resources: ['NPTEL', 'Made Easy notes'],
        },
        {
          name: 'Skills',
          topics: ['Start DSA practice', 'First mini project', 'Git & GitHub basics'],
          resources: ['LeetCode (easy)', 'GitHub learning lab'],
        },
      ],
    },
    {
      phase: 'Year 3',
      title: 'Specialization & Projects',
      duration: 'Semester 5-6',
      goal: 'Pick a specialization, build projects, start prep for placements/GATE.',
      subjects: [
        {
          name: 'Advanced CS',
          topics: ['Computer Networks', 'DBMS Advanced', 'Software Engineering', 'Web/Mobile Development', 'Machine Learning basics'],
          resources: ['CodeWithHarry', 'freeCodeCamp', 'Kunal Kushwaha DSA bootcamp'],
        },
        {
          name: 'Career Prep',
          topics: ['Resume building', 'Aptitude & reasoning', 'Technical interview prep', 'Internship applications', 'GATE prep (if applicable)'],
          resources: ['OverTheWire', 'InterviewBit', 'GATE previous papers'],
        },
        {
          name: 'Projects',
          topics: ['Full-stack web app', 'Open source contribution', 'Mini research project'],
          resources: ['GitHub', 'Hackathons'],
        },
      ],
    },
    {
      phase: 'Year 4',
      title: 'Placements & Final Year',
      duration: 'Semester 7-8',
      goal: 'Crack placements, complete final year project, prepare for career.',
      subjects: [
        {
          name: 'Placement',
          topics: ['DSA interview rounds', 'System design basics', 'HR interview prep', 'Mock interviews', 'Company-specific prep'],
          resources: ['Pramp', 'Tech Mock', 'Striver SDE sheet'],
        },
        {
          name: 'Final Year',
          topics: ['Major project / thesis', 'Industry 4.0 topics', 'Cloud & DevOps basics', 'Career specialization'],
          resources: ['AWS free tier', 'Docker docs', 'Final year project guides'],
        },
      ],
    },
  ],
  be: [
    {
      phase: 'Year 1',
      title: 'Engineering Basics',
      duration: 'Semester 1-2',
      goal: 'Foundation mathematics, science & engineering drawing.',
      subjects: [
        {
          name: 'Core',
          topics: ['Engineering Math I & II', 'Applied Physics', 'Engineering Mechanics', 'Basics of Electrical/Electronics', 'Programming fundamentals'],
          resources: ['NPTEL', 'B.E. first year textbooks', 'Made Easy'],
        },
      ],
    },
    {
      phase: 'Year 2',
      title: 'Branch Fundamentals',
      duration: 'Semester 3-4',
      goal: 'Core branch subjects and lab skills.',
      subjects: [
        {
          name: 'Common',
          topics: ['Strength of Materials', 'Thermodynamics', 'Fluid Mechanics', 'Theory of Machines', 'Data Structures'],
          resources: ['NPTEL', 'Akhilesh Yadav notes', 'YouTube engineering channels'],
        },
        {
          name: 'Skills',
          topics: ['CAD software basics', 'Programming practice', 'Technical report writing'],
          resources: ['AutoCAD tutorials', 'HackerRank'],
        },
      ],
    },
    {
      phase: 'Year 3',
      title: 'Advanced & Project Work',
      duration: 'Semester 5-6',
      goal: 'Specialization subjects + mini projects + internships.',
      subjects: [
        {
          name: 'Advanced',
          topics: ['Machine Design', 'Heat Transfer', 'Manufacturing Processes', 'Control Systems', 'Embedded Systems'],
          resources: ['NPTEL advanced courses', 'Industry case studies'],
        },
        {
          name: 'Career',
          topics: ['Internship search', 'GATE prep', 'Industry visit reports', 'Technical paper presentation'],
          resources: ['GATE previous papers', 'Internshala', 'IEEE papers'],
        },
      ],
    },
    {
      phase: 'Year 4',
      title: 'Capstone & Career',
      duration: 'Semester 7-8',
      goal: 'Major project, placements, higher studies prep.',
      subjects: [
        {
          name: 'Final',
          topics: ['Major project', 'Industrial automation', 'Management & entrepreneurship', 'Placement prep', 'Higher studies (GATE/GRE)'],
          resources: ['Industry mentors', 'GATE coaching', 'Placement portals'],
        },
      ],
    },
  ],
  bca: [
    {
      phase: 'Year 1',
      title: 'Programming Foundation',
      duration: 'Semester 1-2',
      goal: 'Learn programming basics and computer fundamentals.',
      subjects: [
        {
          name: 'Core',
          topics: ['C Programming', 'Digital Computer Fundamentals', 'Mathematics for Computing', 'PC Software & Internet', 'Business Systems'],
          resources: ['CodeWithHarry C course', 'NPTEL', 'GeeksforGeeks'],
        },
      ],
    },
    {
      phase: 'Year 2',
      title: 'Data Structures & Web Basics',
      duration: 'Semester 3-4',
      goal: 'Master DSA, OOP and web development fundamentals.',
      subjects: [
        {
          name: 'Core',
          topics: ['Data Structures using C', 'OOP with C++', 'DBMS', 'Operating Systems', 'Software Engineering'],
          resources: ['Striver DSA sheet', 'Gate Smashers', 'Neso Academy'],
        },
        {
          name: 'Web',
          topics: ['HTML/CSS/JavaScript', 'PHP basics', 'Mini web project'],
          resources: ['freeCodeCamp', 'W3Schools', 'YouTube web dev tutorials'],
        },
      ],
    },
    {
      phase: 'Year 3',
      title: 'Advanced Tech & Career',
      duration: 'Semester 5-6',
      goal: 'Advanced tech, specialization, and placement prep.',
      subjects: [
        {
          name: 'Advanced',
          topics: ['Java Programming', 'Python', 'Web Frameworks (Django/Node)', 'Mobile App Development', 'Cloud Computing basics'],
          resources: ['CodeWithHarry Java', 'Kunal Kushwaha', 'AWS free tier'],
        },
        {
          name: 'Career',
          topics: ['Aptitude & reasoning', 'Technical interview prep', 'Resume + GitHub portfolio', 'Internship'],
          resources: ['InterviewBit', 'LeetCode', 'Internshala'],
        },
      ],
    },
  ],
  bcom: [
    {
      phase: 'Year 1',
      title: 'Commerce Foundation',
      duration: 'Semester 1-2',
      goal: 'Build accounting and business fundamentals.',
      subjects: [
        {
          name: 'Core',
          topics: ['Financial Accounting', 'Business Organization & Management', 'Microeconomics', 'Business Mathematics', 'English/Communication'],
          resources: ['NCERT Accountancy', 'T.S. Grewal Accounting', 'Sandeep Garg Economics'],
        },
      ],
    },
    {
      phase: 'Year 2',
      title: 'Advanced Accounting & Law',
      duration: 'Semester 3-4',
      goal: 'Corporate accounting, law, and statistics.',
      subjects: [
        {
          name: 'Core',
          topics: ['Corporate Accounting', 'Business Law', 'Cost Accounting', 'Business Statistics', 'Income Tax Law'],
          resources: ['T.S. Grewal Corporate Accounting', 'M.C. Kuchhal Business Law', 'S.P. Gupta Statistics'],
        },
        {
          name: 'Skills',
          topics: ['Tally basics', 'Excel for accounting', 'GST practicals'],
          resources: ['Tally Education', 'Excel tutorials', 'GST portal guides'],
        },
      ],
    },
    {
      phase: 'Year 3',
      title: 'Specialization & Career',
      duration: 'Semester 5-6',
      goal: 'Specialization, projects, and professional exam prep (CA/CS/CMA).',
      subjects: [
        {
          name: 'Advanced',
          topics: ['Auditing', 'Financial Management', 'Marketing Management', 'E-Commerce', 'Business Environment'],
          resources: ['Arun Kumar Auditing', 'IMA FM notes', 'Case study journals'],
        },
        {
          name: 'Career',
          topics: ['CA/CS/CMA foundation prep', 'Banking & finance jobs', 'Resume + LinkedIn', 'Internship in audit firm'],
          resources: ['ICAI study material', 'ICSI material', 'LinkedIn learning'],
        },
      ],
    },
  ],
  bsc: [
    {
      phase: 'Year 1',
      title: 'Core Science Foundation',
      duration: 'Semester 1-2',
      goal: 'Build strong base in chosen science subjects.',
      subjects: [
        {
          name: 'Common',
          topics: ['Physics/Mechanics', 'Inorganic Chemistry', 'Cell Biology', 'Mathematics', 'English Communication'],
          resources: ['NCERT Class 11-12', 'H.C. Verma', 'YouTube science channels'],
        },
      ],
    },
    {
      phase: 'Year 2',
      title: 'Advanced Subject Study',
      duration: 'Semester 3-4',
      goal: 'Go deeper into specialization subjects with lab work.',
      subjects: [
        {
          name: 'Physics',
          topics: ['Optics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics basics', 'Lab experiments'],
          resources: ['Resnick Halliday', 'NPTEL Physics', 'Lab manuals'],
        },
        {
          name: 'Chemistry',
          topics: ['Organic Chemistry', 'Physical Chemistry', 'Spectroscopy', 'Lab techniques'],
          resources: ['Clayden Organic', 'P. Atkins Physical', 'Lab journals'],
        },
        {
          name: 'Biology',
          topics: ['Genetics', 'Microbiology', 'Plant Physiology', 'Ecology', 'Lab work'],
          resources: ['Campbell Biology', 'NCERT', 'Microbiology lab manuals'],
        },
      ],
    },
    {
      phase: 'Year 3',
      title: 'Research & Career Path',
      duration: 'Semester 5-6',
      goal: 'Research projects, higher studies (MSc) or job prep.',
      subjects: [
        {
          name: 'Advanced',
          topics: ['Research methodology', 'Dissertation/Project', 'Specialization electives', 'Seminar presentation'],
          resources: ['Research journals', 'University library', 'Faculty mentors'],
        },
        {
          name: 'Career',
          topics: ['MSc / JEST / IIT JAM prep', 'Research assistant roles', 'Lab technician jobs', 'Data analysis skills'],
          resources: ['IIT JAM material', 'CSIR NET material', 'Coursera data science'],
        },
      ],
    },
  ],
};
