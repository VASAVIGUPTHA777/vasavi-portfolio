import { loadEnv, getEnvConfig } from './config/env';
import { logger } from './utils/logger';
import prisma from './config/database';
import app from './app';

// Load env first (before getEnvConfig is called)
loadEnv();
const env = getEnvConfig();

const server = app.listen(env.port, () => {
  logger.info(`🚀 Server started`, {
    port: env.port,
    env: env.nodeEnv,
    url: `http://localhost:${env.port}`,
  });
});

// ── Graceful Shutdown ─────────────────────────────────────────────────────────
const shutdown = async (signal: string): Promise<void> => {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    logger.info('Database connection closed. Server stopped.');
    process.exit(0);
  });

  // Force shutdown if connections are not released within 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown due to timeout');
    process.exit(1);
  }, 10_000);
};

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('Unhandled Promise Rejection', { reason: String(reason) });
  void shutdown('unhandledRejection');
});
