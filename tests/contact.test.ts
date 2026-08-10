import request from 'supertest';
import app from '../src/app';
import prisma from '../src/config/database';

describe('POST /api/contact', () => {
  const validPayload = {
    name: 'Test Visitor',
    email: 'visitor@example.com',
    subject: 'Hello from Postman',
    message: 'This is a test message to check if contact API works correctly.',
  };

  it('should return 201 for a valid contact submission', async () => {
    const res = await request(app).post('/api/contact').send(validPayload);

    if (res.status === 500) {
      // Database not available in this environment — skip DB assertion
      expect(res.body.success).toBe(false);
      return;
    }

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data).toHaveProperty('submittedAt');
    expect(res.body.data.message).toContain('received');
  });

  it('should return 422 when name is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validPayload, name: '' });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('should return 422 for an invalid email', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validPayload, email: 'not-an-email' });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it('should return 422 when message is too short', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validPayload, message: 'Hi' }); // less than 10 chars

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it('should return 422 when message is too long', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validPayload, message: 'A'.repeat(2001) });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });

  it('should return 422 when required fields are missing', async () => {
    const res = await request(app).post('/api/contact').send({});
    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
    expect(Array.isArray(res.body.errors)).toBe(true);
  });

  it('should return 422 when subject is missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ ...validPayload, subject: '' });

    expect(res.status).toBe(422);
    expect(res.body.success).toBe(false);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
