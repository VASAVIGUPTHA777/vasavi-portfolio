import prisma from '../config/database';
import { ExperienceData } from '../types/portfolio.types';

/**
 * Experience service — retrieves work experience records ordered by displayOrder.
 */
export const experienceService = {
  /**
   * Returns all experience entries ordered for display.
   * Current roles (currentlyWorking = true) will naturally appear first
   * given they have the lowest displayOrder in seed data.
   */
  async getAllExperience(): Promise<ExperienceData[]> {
    const experience = await prisma.experience.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return experience as ExperienceData[];
  },
};
