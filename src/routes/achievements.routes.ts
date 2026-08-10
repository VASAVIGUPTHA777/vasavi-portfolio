import { Router } from 'express';
import { achievementsController } from '../controllers/achievements.controller';

const router = Router();

/**
 * GET /api/achievements
 * Returns all achievement entries ordered by displayOrder.
 */
router.get('/', achievementsController.getAllAchievements);

export default router;
