import prisma from '../config/database';
import { SkillCategory, SkillData, GroupedSkills } from '../types/portfolio.types';

/**
 * Skills service — retrieves skill records, with optional category filtering
 * and a helper to return skills grouped by category for frontend convenience.
 */
export const skillsService = {
  /**
   * Returns all skills, optionally filtered by category.
   * Results are ordered by displayOrder for consistent presentation.
   */
  async getAllSkills(category?: string): Promise<SkillData[]> {
    const validCategories: SkillCategory[] = [
      'LANGUAGES',
      'FRAMEWORKS_AND_WEB',
      'DATABASES',
      'CORE_CS',
      'TOOLS',
      'CONCEPTS',
    ];

    const where =
      category && validCategories.includes(category as SkillCategory)
        ? { category: category as SkillCategory }
        : undefined;

    const skills = await prisma.skill.findMany({
      where,
      orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }],
    });

    return skills as SkillData[];
  },

  /**
   * Returns skills grouped by category.
   * Useful for the frontend to render skill sections without extra processing.
   */
  async getGroupedSkills(): Promise<GroupedSkills> {
    const skills = await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { displayOrder: 'asc' }],
    });

    const grouped: GroupedSkills = {};
    for (const skill of skills) {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill as SkillData);
    }

    return grouped;
  },
};
