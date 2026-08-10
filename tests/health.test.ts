import request from 'supertest';
import app from '../src/app';

describe('GET /api/health', () => {
  it('should return 200 with status ok', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('ok');
    expect(res.body.data.service).toBe('vasavi-portfolio-backend');
    expect(res.body.data.timestamp).toBeDefined();
  });

  it('should return a valid ISO timestamp', async () => {
    const res = await request(app).get('/api/health');
    const ts = new Date(res.body.data.timestamp as string);
    expect(ts).toBeInstanceOf(Date);
    expect(isNaN(ts.getTime())).toBe(false);
  });
});

describe('GET /api/unknown-route', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/this-does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('not found');
  });
});
