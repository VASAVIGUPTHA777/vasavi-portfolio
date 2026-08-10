import { Request, Response, NextFunction } from 'express';
import { educationService } from '../services/education.service';
import { sendSuccess } from '../utils/apiResponse';

export const educationController = {
  async getAllEducation(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const education = await educationService.getAllEducation();
      sendSuccess(res, education);
    } catch (error) {
      next(error);
    }
  },
};
