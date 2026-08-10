import prisma from '../config/database';
import { AppError } from '../middleware/errorHandler';
import { ProfileData } from '../types/portfolio.types';

/**
 * Profile service — handles all database operations related to the portfolio owner's profile.
 * Returns the single profile record (there is only one profile in a personal portfolio).
 */
export const profileService = {
  /**
   * Retrieves the portfolio owner's profile.
   * Throws a 404 AppError if no profile has been seeded yet.
   */
  async getProfile(): Promise<ProfileData> {
    const profile = await prisma.profile.findFirst();

    if (!profile) {
      throw new AppError('Profile not found. Please seed the database.', 404);
    }

    return profile;
  },
};
