import { Request, Response, NextFunction } from 'express';
import { body, ValidationChain } from 'express-validator';
import { contactService } from '../services/contact.service';
import { sendSuccess } from '../utils/apiResponse';

/**
 * Contact form validation rules.
 * Exported separately so they can be used directly in the route definition.
 */
export const contactValidators: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters.'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required.')
    .isLength({ min: 3, max: 150 })
    .withMessage('Subject must be between 3 and 150 characters.'),

  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required.')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters.'),
];

export const contactController = {
  async submit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, subject, message } = req.body as {
        name: string;
        email: string;
        subject: string;
        message: string;
      };

      const result = await contactService.saveContactMessage({ name, email, subject, message });

      sendSuccess(
        res,
        {
          id: result.id,
          message: 'Your message has been received. Thank you for reaching out!',
          submittedAt: result.createdAt,
        },
        201
      );
    } catch (error) {
      next(error);
    }
  },
};
