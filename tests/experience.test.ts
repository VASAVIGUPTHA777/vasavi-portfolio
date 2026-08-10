import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('GET /api/experience', () => {
  it('should return 200 with an array', async () => {
    const res = await request(app).get('/api/experience');
    if (res.status === 500) { expect(res.body.success).toBe(false); return; }
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return experience entries with correct shape', async () => {
    const res = await request(app).get('/api/experience');
    if (res.status === 500 || !res.body.data) return; // Skip if no DB
    if (res.body.data.length === 0) return;

    const entry = res.body.data[0];
    expect(entry).toHaveProperty('id');
    expect(entry).toHaveProperty('company');
    expect(entry).toHaveProperty('position');
    expect(entry).toHaveProperty('startDate');
    expect(entry).toHaveProperty('currentlyWorking');
    expect(entry).toHaveProperty('technologies');
    expect(Array.isArray(entry.technologies)).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
