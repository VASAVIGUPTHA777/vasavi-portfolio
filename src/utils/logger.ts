/**
 * Lightweight logger utility.
 * In production, swap this out for a library like Winston or Pino.
 */

const timestamp = (): string => new Date().toISOString();

export const logger = {
  info: (message: string, meta?: Record<string, unknown>): void => {
    console.log(JSON.stringify({ level: 'info', timestamp: timestamp(), message, ...meta }));
  },

  warn: (message: string, meta?: Record<string, unknown>): void => {
    console.warn(JSON.stringify({ level: 'warn', timestamp: timestamp(), message, ...meta }));
  },

  error: (message: string, meta?: Record<string, unknown>): void => {
    console.error(JSON.stringify({ level: 'error', timestamp: timestamp(), message, ...meta }));
  },

  request: (method: string, url: string, statusCode: number, durationMs: number): void => {
    console.log(
      JSON.stringify({
        level: 'info',
        timestamp: timestamp(),
        type: 'request',
        method,
        url,
        statusCode,
        durationMs,
      })
    );
  },
};
