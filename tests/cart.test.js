const request = require('supertest');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../src/schema');

const app = express();
app.use((req, res, next) => {
  req.userId = 'test-user';
  next();
});
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: false,
  context: { userId: 'test-user' }
}));

describe('Cart API', () => {
  it('should add item to cart', async () => {
    const mutation = `
      mutation {
        addItem(id: "1", name: "Apple", quantity: 3, unitPrice: 1.5) {
          id
          name
          quantity
          unitPrice
        }
      }
    `;
    const res = await request(app)
      .post('/graphql')
      .send({ query: mutation });

    expect(res.body.data.addItem.name).toBe('Apple');
  });

  it('should reject negative quantity', async () => {
    const mutation = `
      mutation {
        addItem(id: "2", name: "Orange", quantity: -5, unitPrice: 2.0) {
          id
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.errors[0].message).toBe('Quantity must be positive');
  });

  it('should update item quantity', async () => {
    const mutation = `
      mutation {
        updateItem(id: "1", quantity: 10) {
          id
          quantity
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.data.updateItem.quantity).toBe(10);
  });

  it('should return 404-like error if item not found on update', async () => {
    const mutation = `
      mutation {
        updateItem(id: "non-existent", quantity: 2) {
          id
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.errors[0].message).toBe('Item not found');
  });

  it('should list cart with total', async () => {
    const query = `
      query {
        getCart {
          items {
            id
            name
          }
          total
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query });
    expect(res.body.data.getCart.total).toBeGreaterThan(0);
  });
});
