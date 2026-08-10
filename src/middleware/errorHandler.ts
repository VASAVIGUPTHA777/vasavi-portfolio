import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Custom application error class.
 * Allows services to throw typed errors that the handler can process correctly.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    // Restore prototype chain (required when extending built-in classes in TS)
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Global error handling middleware.
 * Must be registered AFTER all routes in app.ts.
 * Catches both operational errors (AppError) and unexpected errors.
 */
export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    // Operational, known error — safe to return message to client
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // Unexpected / programming error — log full details, return generic message
  logger.error('Unexpected error', {
    name: err.name,
    message: err.message,
    stack: process.env['NODE_ENV'] !== 'production' ? err.stack : undefined,
  });

  res.status(500).json({
    success: false,
    message: 'An internal server error occurred. Please try again later.',
  });
}
