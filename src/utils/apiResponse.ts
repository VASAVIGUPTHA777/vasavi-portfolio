import { Response } from 'express';

/**
 * Standard success response shape.
 * All API responses follow this contract so the frontend can rely on a consistent structure.
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * Standard error response shape.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
}

/**
 * Sends a standardized success response.
 */
export function sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
  const body: ApiSuccessResponse<T> = { success: true, data };
  res.status(statusCode).json(body);
}

/**
 * Sends a standardized error response.
 */
export function sendError(
  res: Response,
  message: string,
  statusCode = 500,
  errors?: string[]
): void {
  const body: ApiErrorResponse = { success: false, message, ...(errors && { errors }) };
  res.status(statusCode).json(body);
}
