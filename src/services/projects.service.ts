import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { ProjectData } from '../types/portfolio.types';

/**
 * Projects service — retrieves project records.
 * Supports fetching all projects or a single project by ID.
 */
export const projectsService = {
  /**
   * Returns all projects ordered by displayOrder.
   */
  async getAllProjects(): Promise<ProjectData[]> {
    const projects = await prisma.project.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return projects as ProjectData[];
  },

  /**
   * Returns a single project by its ID.
   * Throws 404 AppError if the project does not exist.
   */
  async getProjectById(id: string): Promise<ProjectData> {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new AppError(`Project with ID '${id}' not found.`, 404);
    }

    return project as ProjectData;
  },
};
