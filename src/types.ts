export type User = {
  email: string;
  name: string;
  createdAt: string;
};

export type Note = {
  id: string;
  course: string;
  title: string;
  content: string;
  progress: number;
  updatedAt: string;
};

export type CourseId =
  | '10th'
  | '12th'
  | 'btech'
  | 'be'
  | 'bca'
  | 'bcom'
  | 'bsc';

export type CourseCategory = 'school' | 'degree';

export type CourseInfo = {
  id: CourseId;
  name: string;
  fullName: string;
  category: CourseCategory;
  description: string;
  theme: 'green' | 'orange';
  icon: string;
};

export type RoadmapPhase = {
  phase: string;
  title: string;
  duration: string;
  goal: string;
  subjects: {
    name: string;
    topics: string[];
    resources: string[];
  }[];
};

export type Page = 'home' | CourseId | 'tracker' | 'youtube' | 'ai-doubt';
