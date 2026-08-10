import prisma from '../config/database';
import { AchievementData } from '../types/portfolio.types';

/**
 * Achievements service — retrieves achievement records ordered by displayOrder.
 */
export const achievementsService = {
  async getAllAchievements(): Promise<AchievementData[]> {
    const achievements = await prisma.achievement.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return achievements as AchievementData[];
  },
};
