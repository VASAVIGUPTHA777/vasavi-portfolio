import { Router } from 'express';
import { contactController, contactValidators } from '../controllers/contact.controller';
import { validate } from '../middleware/validate';
import { contactRateLimiter } from '../middleware/rateLimiter';

const router = Router();

/**
 * POST /api/contact
 * Submits a contact message from a visitor.
 *
 * Rate limited: 5 requests/hour per IP.
 * Validated: name, email, subject, message (see contactValidators).
 * No authentication required — public endpoint.
 */
router.post('/', contactRateLimiter, validate(contactValidators), contactController.submit);

export default router;
