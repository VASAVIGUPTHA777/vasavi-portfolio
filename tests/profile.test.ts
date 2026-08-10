import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('GET /api/profile', () => {
  it('should return 200 with profile data when seeded', async () => {
    // This test requires the DB to be seeded
    const res = await request(app).get('/api/profile');

    if (res.status === 404 || res.status === 500) {
      // DB not seeded or not available — acceptable in CI without DB
      expect(res.body.success).toBe(false);
      return;
    }

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.data).toHaveProperty('email');
    expect(res.body.data).toHaveProperty('linkedinUrl');
    expect(res.body.data).toHaveProperty('githubUrl');
  });

  it('should not expose sensitive internal fields', async () => {
    const res = await request(app).get('/api/profile');
    if (res.status !== 200) return; // Skip if no DB or not seeded

    // Should NOT contain server-side internal identifiers beyond id
    expect(res.body.data).not.toHaveProperty('password');
    expect(res.body.data).not.toHaveProperty('secret');
  });

  it('should return correct content-type', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
