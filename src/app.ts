import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { loadEnv, getEnvConfig } from './config/env';
import { generalRateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { logger } from './utils/logger';
import apiRoutes from './routes/index';

// dotenv.config is idempotent — safe to call here even if server.ts already called it.
// This ensures tests that import app.ts directly also have env variables loaded.
loadEnv();
const env = getEnvConfig();

const app: Application = express();

// ── Security Middleware ───────────────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const allowedOrigins = [...env.corsOrigin, 'http://localhost', 'http://127.0.0.1'];
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS: Origin '${origin}' is not allowed`), false);
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Accept'],
    credentials: false,
  })
);

// ── Body Parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Limit body size to prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Request Logging ───────────────────────────────────────────────────────────
if (env.nodeEnv !== 'test') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
      logger.request(req.method, req.originalUrl, res.statusCode, Date.now() - start);
    });
    next();
  });
}

// ── Rate Limiting ─────────────────────────────────────────────────────────────
app.use('/api', generalRateLimiter);

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api', apiRoutes);

// ── Root redirect ─────────────────────────────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      message: 'Vasavi Portfolio API',
      version: '1.0.0',
      docs: '/api/health',
    },
  });
});

// ── 404 Handler (must come after all routes) ──────────────────────────────────
app.use(notFound);

// ── Global Error Handler (must be last) ──────────────────────────────────────
app.use(errorHandler);

export default app;
