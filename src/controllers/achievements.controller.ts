import { Request, Response, NextFunction } from 'express';
import { achievementsService } from '../services/achievements.service';
import { sendSuccess } from '../utils/apiResponse';

export const achievementsController = {
  async getAllAchievements(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const achievements = await achievementsService.getAllAchievements();
      sendSuccess(res, achievements);
    } catch (error) {
      next(error);
    }
  },
};
