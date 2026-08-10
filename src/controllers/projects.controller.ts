import { Request, Response, NextFunction } from 'express';
import { projectsService } from '../services/projects.service';
import { sendSuccess } from '../utils/apiResponse';

export const projectsController = {
  async getAllProjects(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await projectsService.getAllProjects();
      sendSuccess(res, projects);
    } catch (error) {
      next(error);
    }
  },

  async getProjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const project = await projectsService.getProjectById(id);
      sendSuccess(res, project);
    } catch (error) {
      next(error);
    }
  },
};
