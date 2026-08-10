import { Router } from 'express';
import { projectsController } from '../controllers/projects.controller';

const router = Router();

/**
 * GET /api/projects      — All projects
 * GET /api/projects/:id  — Single project by ID
 */
router.get('/', projectsController.getAllProjects);
router.get('/:id', projectsController.getProjectById);

export default router;
