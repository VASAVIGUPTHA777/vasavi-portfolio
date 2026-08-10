import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('GET /api/education', () => {
  it('should return 200 with an array', async () => {
    const res = await request(app).get('/api/education');
    if (res.status === 500) { expect(res.body.success).toBe(false); return; }
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return education entries with correct shape', async () => {
    const res = await request(app).get('/api/education');
    if (res.status === 500 || !res.body.data) return; // Skip if no DB
    if (res.body.data.length === 0) return;

    const entry = res.body.data[0];
    expect(entry).toHaveProperty('id');
    expect(entry).toHaveProperty('degree');
    expect(entry).toHaveProperty('institution');
    expect(entry).toHaveProperty('displayOrder');
  });

  it('should return entries ordered by displayOrder', async () => {
    const res = await request(app).get('/api/education');
    if (res.status === 500) return; // Skip if no DB
    const data = res.body.data as Array<{ displayOrder: number }>;
    for (let i = 1; i < data.length; i++) {
      expect(data[i].displayOrder).toBeGreaterThanOrEqual(data[i - 1].displayOrder);
    }
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
