import { Request, Response, NextFunction } from 'express';
import { portfolioService } from '../services/portfolio.service';
import { sendSuccess } from '../utils/apiResponse';

/**
 * Portfolio controller — returns the complete portfolio in a single API call.
 * Designed for frontend performance: one request loads all sections.
 */
export const portfolioController = {
  async getFullPortfolio(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const portfolio = await portfolioService.getFullPortfolio();
      sendSuccess(res, portfolio);
    } catch (error) {
      next(error);
    }
  },
};
