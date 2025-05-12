import request from 'supertest';
import express from 'express';
import orderRoutes from '../routes/orderRoutes';

const app = express();
app.use(express.json());
app.use('/orders', orderRoutes);

describe('Order Splitter API', () => {
  it('should create a BUY order successfully', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        type: 'BUY',
        totalAmount: 100,
        portfolio: [
          { symbol: 'AAPL', allocation: 60, price: 150 },
          { symbol: 'TSLA', allocation: 40 }
        ]
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('executionDate');
    expect(res.body.breakdown).toHaveLength(2);
  });

  it('should fail if total allocation is not 100%', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        type: 'SELL',
        totalAmount: 100,
        portfolio: [
          { symbol: 'AAPL', allocation: 30 },
          { symbol: 'TSLA', allocation: 30 }
        ]
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Total allocation across all stocks must equal 100%./i);
  });

  it('should return all orders (GET)', async () => {
    const res = await request(app).get('/orders');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 400 for missing required fields', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        totalAmount: 100,
        portfolio: [{ symbol: 'AAPL', allocation: 100 }]
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Order type must be provided and must be either \"BUY\" or \"SELL\"./i);
  });

  it('should reject invalid order type', async () => {
    const res = await request(app)
      .post('/orders')
      .send({
        type: 'INVALID',
        totalAmount: 100,
        portfolio: [{ symbol: 'AAPL', allocation: 100 }]
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/Order type must be provided and must be either \"BUY\" or \"SELL\"./i);
  });
});
