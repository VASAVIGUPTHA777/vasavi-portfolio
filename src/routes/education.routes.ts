import { Router } from 'express';
import { educationController } from '../controllers/education.controller';

const router = Router();

/**
 * GET /api/education
 * Returns all education entries ordered by displayOrder.
 */
router.get('/', educationController.getAllEducation);

export default router;
