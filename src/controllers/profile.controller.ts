import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profile.service';
import { sendSuccess } from '../utils/apiResponse';

/**
 * Profile controller — thin layer that delegates to profileService.
 * Handles HTTP concerns (req/res) only; no business logic here.
 */
export const profileController = {
  async getProfile(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = await profileService.getProfile();
      sendSuccess(res, profile);
    } catch (error) {
      next(error);
    }
  },
};
