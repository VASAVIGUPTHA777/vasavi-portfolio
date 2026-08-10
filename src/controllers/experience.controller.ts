import { Request, Response, NextFunction } from 'express';
import { experienceService } from '../services/experience.service';
import { sendSuccess } from '../utils/apiResponse';

export const experienceController = {
  async getAllExperience(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const experience = await experienceService.getAllExperience();
      sendSuccess(res, experience);
    } catch (error) {
      next(error);
    }
  },
};
