import { Request, Response, NextFunction } from 'express';

/**
 * 404 Not Found handler.
 * Registered as the last route in app.ts to catch all unmatched paths.
 */
export function notFound(req: Request, res: Response, _next: NextFunction): void {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}
