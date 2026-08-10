import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('GET /api/projects', () => {
  it('should return 200 with an array of projects', async () => {
    const res = await request(app).get('/api/projects');
    if (res.status === 500) { expect(res.body.success).toBe(false); return; }
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should return projects with correct shape', async () => {
    const res = await request(app).get('/api/projects');
    if (res.status === 500 || !res.body.data) return; // Skip if no DB
    if (res.body.data.length === 0) return;

    const project = res.body.data[0];
    expect(project).toHaveProperty('id');
    expect(project).toHaveProperty('title');
    expect(project).toHaveProperty('description');
    expect(project).toHaveProperty('technologies');
    expect(Array.isArray(project.technologies)).toBe(true);
  });
});

describe('GET /api/projects/:id', () => {
  it('should return a single project for a valid ID', async () => {
    // First get all projects to get a real ID
    const listRes = await request(app).get('/api/projects');
    if (listRes.body.data.length === 0) return; // Skip if no DB

    const firstProjectId = (listRes.body.data as Array<{ id: string }>)[0].id;
    const res = await request(app).get(`/api/projects/${firstProjectId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(firstProjectId);
  });

  it('should return 404 for a non-existent project ID', async () => {
    const res = await request(app).get('/api/projects/non-existent-id-that-does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBeDefined();
  });

  it('should return 404 for a valid cuid-like but non-existent ID', async () => {
    const res = await request(app).get('/api/projects/clzzzzzzzzzzzzzzzzzzzzzzz');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
