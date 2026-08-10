export type SkillCategory =
  | 'LANGUAGES'
  | 'FRAMEWORKS_AND_WEB'
  | 'DATABASES'
  | 'CORE_CS'
  | 'TOOLS'
  | 'CONCEPTS';

export type Proficiency = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface ProfileData {
  id: string;
  name: string;
  headline: string;
  summary: string;
  email: string;
  phone: string;
  location: string;
  profileImage: string | null;
  resumeUrl: string | null;
  linkedinUrl: string;
  githubUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkillData {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: Proficiency;
  displayOrder: number;
}

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  description: string;
  technologies: string[];
  displayOrder: number;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  imageUrl: string | null;
  displayOrder: number;
}

export interface EducationData {
  id: string;
  degree: string;
  institution: string;
  startYear: number | null;
  endYear: number | null;
  expectedGraduation: string | null;
  cgpa: number | null;
  percentage: number | null;
  gpa: string | null;
  description: string | null;
  displayOrder: number;
}

export interface AchievementData {
  id: string;
  title: string;
  description: string | null;
  displayOrder: number;
}

export interface ContactMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface PortfolioData {
  profile: ProfileData | null;
  skills: SkillData[];
  experience: ExperienceData[];
  projects: ProjectData[];
  education: EducationData[];
  achievements: AchievementData[];
}

export type GroupedSkills = Record<string, SkillData[]>;

// THIS WAS MISSING:
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}