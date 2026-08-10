/**
 * Shared TypeScript interfaces and types for the portfolio backend.
 * These are used by services and controllers to ensure type safety
 * without depending on Prisma's generated types directly in every layer.
 */

// ─── Enums (mirroring Prisma enums for use in service layer) ─────────────────

export type SkillCategory =
  | 'LANGUAGES'
  | 'FRAMEWORKS_AND_WEB'
  | 'DATABASES'
  | 'CORE_CS'
  | 'TOOLS'
  | 'CONCEPTS';

export type Proficiency = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

// ─── Domain types ─────────────────────────────────────────────────────────────

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
  createdAt: Date;
  updatedAt: Date;
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
  startDate: Date;
  endDate: Date | null;
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

// ─── Aggregated portfolio response ───────────────────────────────────────────

export interface PortfolioData {
  profile: ProfileData | null;
  skills: SkillData[];
  experience: ExperienceData[];
  projects: ProjectData[];
  education: EducationData[];
  achievements: AchievementData[];
}

// ─── Grouped skills ───────────────────────────────────────────────────────────

export type GroupedSkills = Record<string, SkillData[]>;
