/**
 * Jest global setup — sets NODE_ENV to test before any test file runs.
 * This suppresses request logging during tests.
 */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

process.env['NODE_ENV'] = 'test';
process.env['DATABASE_URL'] = process.env['DATABASE_URL'] ?? 'postgresql://postgres:password@localhost:5432/vasavi_portfolio?schema=public';
process.env['PORT'] = '3001';
process.env['CORS_ORIGIN'] = 'http://localhost:3000';
process.env['RATE_LIMIT_WINDOW_MS'] = '900000';
process.env['RATE_LIMIT_MAX_REQUESTS'] = '1000'; // High limit for tests
process.env['CONTACT_RATE_LIMIT_WINDOW_MS'] = '3600000';
process.env['CONTACT_RATE_LIMIT_MAX_REQUESTS'] = '1000'; // High limit for tests
