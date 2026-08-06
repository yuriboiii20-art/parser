/**
 * Jest Integration Tests for API Endpoints
 */

const request = require('supertest');
const app = require('../server');

describe('REST API Endpoint Tests', () => {
  test('GET /api/health should return online status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('online');
  });

  test('GET /api/parser/sample should return sample JSON structure', async () => {
    const res = await request(app).get('/api/parser/sample');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('name', 'Redacted User');
    expect(res.body.data.skills).toHaveProperty('languages');
  });

  test('GET /api/parser/download should download sample JSON when no ID provided', async () => {
    const res = await request(app).get('/api/parser/download');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toContain('application/json');
    expect(res.headers['content-disposition']).toContain('attachment');
  });

  test('POST /api/parser/upload should return 400 if no file attached', async () => {
    const res = await request(app).post('/api/parser/upload');
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});
