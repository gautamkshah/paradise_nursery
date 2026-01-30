import request from 'supertest';
import app from '../src/index';

describe('Products API', () => {
    it('GET /api/products should return 200', async () => {
        const res = await request(app).get('/api/products');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
