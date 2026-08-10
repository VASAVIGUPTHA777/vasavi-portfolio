import { Router } from 'express';
import { skillsController } from '../controllers/skills.controller';

const router = Router();

/**
 * GET /api/skills
 * Returns all skills.
 * Query params:
 *   ?category=LANGUAGES|FRAMEWORKS_AND_WEB|DATABASES|CORE_CS|TOOLS|CONCEPTS
 *   ?grouped=true  → returns skills grouped by category
 */
router.get('/', skillsController.getAllSkills);

export default router;
