import prisma from '../config/database';
import { EducationData } from '../types/portfolio.types';

/**
 * Education service — retrieves education records ordered by displayOrder.
 * Most recent / highest level appears first.
 */
export const educationService = {
  async getAllEducation(): Promise<EducationData[]> {
    const education = await prisma.education.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return education as EducationData[];
  },
};
