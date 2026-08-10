import { Request, Response, NextFunction } from 'express';
import { skillsService } from '../services/skills.service';
import { sendSuccess } from '../utils/apiResponse';

/**
 * Skills controller.
 * Supports optional ?category= query parameter and ?grouped=true for grouped response.
 */
export const skillsController = {
  async getAllSkills(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category, grouped } = req.query as { category?: string; grouped?: string };

      if (grouped === 'true') {
        const groupedSkills = await skillsService.getGroupedSkills();
        sendSuccess(res, groupedSkills);
        return;
      }

      const skills = await skillsService.getAllSkills(category);
      sendSuccess(res, skills);
    } catch (error) {
      next(error);
    }
  },
};
