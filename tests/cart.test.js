const request = require('supertest');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../src/schema');

const app = express();

// Simulate authentication middleware
app.use((req, res, next) => {
  req.userId = 'testuser123'; // Fake user token
  next();
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: false,
  context: { userId: 'testuser123' }
}));

describe('Cart API', () => {

  // Happy Path: Add item to cart
  it('should add item to cart', async () => {
    const mutation = `
      mutation {
        addItem(id: "1", name: "Pen", quantity: 2, unitPrice: 1.5) {
          id
          name
          quantity
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.data.addItem.name).toBe('Pen');
    expect(res.body.data.addItem.quantity).toBe(2);
  });

  // Happy Path: Update item quantity
  it('should update item quantity', async () => {
    const mutation = `
      mutation {
        updateItem(id: "1", quantity: 5) {
          id
          quantity
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.data.updateItem.quantity).toBe(5);
  });

  //Happy Path: Get cart with total
  it('should list cart with total', async () => {
    const query = `
      query {
        getCart {
          total
          items {
            id
            name
          }
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query });
    expect(res.body.data.getCart.totalprice).toBeGreaterThan(0);
    expect(res.body.data.getCart.items.length).toBeGreaterThan(0);
  });

  //Happy Path: Remove item
  it('should remove item from cart', async () => {
    const mutation = `
      mutation {
        removeItem(id: "1")
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.data.removeItem).toContain('Item 1 removed');
  });

  // Happy Path: Clear cart
  it('should clear the cart', async () => {
    // Add an item again to test clearCart
    const add = `
      mutation {
        addItem(id: "2", name: "Book", quantity: 1, unitPrice: 10.0) {
          id
        }
      }
    `;
    await request(app).post('/graphql').send({ query: add });

    // Clear the cart
    const mutation = `
      mutation {
        clearCart
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.data.clearCart).toBe('Cart cleared');
  });

  // Error Case: Add item with negative quantity
  it('should reject negative quantity', async () => {
    const mutation = `
      mutation {
        addItem(id: "3", name: "Pencil", quantity: -2, unitPrice: 1.0) {
          id
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.errors[0].message).toBe('Quantity must be positive');
  });

  //Error Case: Update non-existent item
  it('should return 404-like error if item not found on update', async () => {
    const mutation = `
      mutation {
        updateItem(id: "nonexistent", quantity: 3) {
          id
        }
      }
    `;
    const res = await request(app).post('/graphql').send({ query: mutation });
    expect(res.body.errors[0].message).toBe('Item not found');
  });

});
