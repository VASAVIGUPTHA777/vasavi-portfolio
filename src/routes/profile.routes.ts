import { Router } from 'express';
import { profileController } from '../controllers/profile.controller';

const router = Router();

/**
 * GET /api/profile
 * Returns the portfolio owner's profile information.
 */
router.get('/', profileController.getProfile);

export default router;
