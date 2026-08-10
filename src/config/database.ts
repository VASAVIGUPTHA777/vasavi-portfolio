import { PrismaClient } from '@prisma/client';

/**
 * Singleton Prisma client instance.
 * Reused across the entire application to avoid
 * creating multiple database connections.
 */
const prisma = new PrismaClient({
  log: process.env['NODE_ENV'] === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
});

export default prisma;
