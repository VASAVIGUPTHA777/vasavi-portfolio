import { Router } from 'express';
import { experienceController } from '../controllers/experience.controller';

const router = Router();

/**
 * GET /api/experience
 * Returns all work experience entries ordered by displayOrder.
 */
router.get('/', experienceController.getAllExperience);

export default router;
