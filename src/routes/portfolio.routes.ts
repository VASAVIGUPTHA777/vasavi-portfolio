import { Router } from 'express';
import { portfolioController } from '../controllers/portfolio.controller';

const router = Router();

/**
 * GET /api/portfolio
 * Returns the complete portfolio data in a single aggregated response.
 * Use this endpoint to load the entire portfolio in one HTTP call.
 */
router.get('/', portfolioController.getFullPortfolio);

export default router;
