import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';

/**
 * Runs an array of express-validator ValidationChains and then checks for errors.
 * If validation errors exist, returns a 422 response with all error messages.
 * Usage: router.post('/contact', validate(contactValidators), contactController.submit)
 */
export function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Run all validations
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }

    const errorMessages = errors.array().map((err) => err.msg as string);

    res.status(422).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages,
    });
  };
}
