import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { getEnvConfig } from '../config/env';

const env = getEnvConfig();

/**
 * General API rate limiter.
 * Applied to all /api/* routes to prevent abuse.
 * Default: 100 requests per 15 minutes per IP.
 */
export const generalRateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
});

/**
 * Strict rate limiter for the contact form endpoint.
 * Default: 5 submissions per hour per IP.
 * Prevents spam without requiring authentication.
 */
export const contactRateLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: env.contactRateLimitWindowMs,
  max: env.contactRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'You have sent too many messages. Please wait before trying again.',
  },
});
