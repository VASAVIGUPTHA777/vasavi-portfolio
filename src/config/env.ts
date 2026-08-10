import dotenv from 'dotenv';
import path from 'path';

/**
 * Loads environment variables from .env file.
 * Call this once at the very start of the application.
 */
export function loadEnv(): void {
  dotenv.config({ path: path.resolve(process.cwd(), '.env') });
}

/**
 * Typed environment configuration.
 * Throws at startup if a required variable is missing,
 * preventing silent misconfiguration.
 */
function getRequiredEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getOptionalEnv(key: string, defaultValue: string): string {
  return process.env[key] ?? defaultValue;
}

export interface EnvConfig {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  corsOrigin: string[];
  rateLimitWindowMs: number;
  rateLimitMax: number;
  contactRateLimitWindowMs: number;
  contactRateLimitMax: number;
}

export function getEnvConfig(): EnvConfig {
  return {
    port: parseInt(getOptionalEnv('PORT', '3000'), 10),
    nodeEnv: getOptionalEnv('NODE_ENV', 'development'),
    databaseUrl: getRequiredEnv('DATABASE_URL'),
    corsOrigin: getOptionalEnv('CORS_ORIGIN', 'http://localhost:3000')
      .split(',')
      .map((origin) => origin.trim()),
    rateLimitWindowMs: parseInt(getOptionalEnv('RATE_LIMIT_WINDOW_MS', '900000'), 10),
    rateLimitMax: parseInt(getOptionalEnv('RATE_LIMIT_MAX_REQUESTS', '100'), 10),
    contactRateLimitWindowMs: parseInt(getOptionalEnv('CONTACT_RATE_LIMIT_WINDOW_MS', '3600000'), 10),
    contactRateLimitMax: parseInt(getOptionalEnv('CONTACT_RATE_LIMIT_MAX_REQUESTS', '5'), 10),
  };
}
