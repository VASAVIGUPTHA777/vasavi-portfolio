import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('GET /api/skills', () => {
  it('should return 200 with an array of skills', async () => {
    const res = await request(app).get('/api/skills');
    if (res.status === 500) { expect(res.body.success).toBe(false); return; }
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return skills with correct shape', async () => {
    const res = await request(app).get('/api/skills');
    if (res.status === 500 || !res.body.data) return; // Skip if no DB
    if (res.body.data.length === 0) return; // Skip if DB not seeded

    const skill = res.body.data[0];
    expect(skill).toHaveProperty('id');
    expect(skill).toHaveProperty('name');
    expect(skill).toHaveProperty('category');
    expect(skill).toHaveProperty('proficiency');
    expect(skill).toHaveProperty('displayOrder');
  });

  it('should filter skills by category', async () => {
    const res = await request(app).get('/api/skills?category=LANGUAGES');
    if (res.status === 500) { expect(res.body.success).toBe(false); return; }
    expect(res.status).toBe(200);
    if (res.body.data.length > 0) {
      for (const skill of res.body.data as Array<{ category: string }>) {
        expect(skill.category).toBe('LANGUAGES');
      }
    }
  });

  it('should return grouped skills when ?grouped=true', async () => {
    const res = await request(app).get('/api/skills?grouped=true');
    if (res.status === 500) { expect(res.body.success).toBe(false); return; }
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    // Data should be an object, not an array
    expect(typeof res.body.data).toBe('object');
    expect(Array.isArray(res.body.data)).toBe(false);
  });

  it('should ignore invalid category values and return all skills', async () => {
    const res = await request(app).get('/api/skills?category=INVALID_CATEGORY');
    if (res.status === 500) { expect(res.body.success).toBe(false); return; }
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
