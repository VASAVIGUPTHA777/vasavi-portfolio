import { profileService } from './profile.service';
import { skillsService } from './skills.service';
import { experienceService } from './experience.service';
import { projectsService } from './projects.service';
import { educationService } from './education.service';
import { achievementsService } from './achievements.service';
import { PortfolioData } from '../types/portfolio.types';

/**
 * Portfolio service — aggregates all portfolio sections into a single response.
 * The /api/portfolio endpoint uses this so the frontend can load
 * the entire portfolio with one HTTP request.
 */
export const portfolioService = {
  async getFullPortfolio(): Promise<PortfolioData> {
    // Fetch all sections in parallel for optimal performance
    const [profile, skills, experience, projects, education, achievements] = await Promise.all([
      profileService.getProfile().catch(() => null),
      skillsService.getAllSkills(),
      experienceService.getAllExperience(),
      projectsService.getAllProjects(),
      educationService.getAllEducation(),
      achievementsService.getAllAchievements(),
    ]);

    return {
      profile,
      skills,
      experience,
      projects,
      education,
      achievements,
    };
  },
};
