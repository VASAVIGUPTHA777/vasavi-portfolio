import { Router } from 'express';
import profileRoutes from './profile.routes';
import skillsRoutes from './skills.routes';
import experienceRoutes from './experience.routes';
import projectsRoutes from './projects.routes';
import educationRoutes from './education.routes';
import achievementsRoutes from './achievements.routes';
import portfolioRoutes from './portfolio.routes';
import contactRoutes from './contact.routes';

const router = Router();

/**
 * Health check — no database dependency
 * GET /api/health
 */
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'vasavi-portfolio-backend',
      version: '1.0.0',
    },
  });
});

// ── Domain routes ─────────────────────────────────────────────────────────────
router.use('/profile', profileRoutes);
router.use('/skills', skillsRoutes);
router.use('/experience', experienceRoutes);
router.use('/projects', projectsRoutes);
router.use('/education', educationRoutes);
router.use('/achievements', achievementsRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/contact', contactRoutes);

export default router;
