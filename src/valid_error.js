const store = require('./data');

function getCartTotal(items) {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

module.exports = {
  getCart: (_, __, { userId }) => {
    const cart = store.getCart(userId);
    return { items: cart.items, totalprice: getCartTotal(cart.items) };
  },
  addItem: (_, { id, name, quantity, unitPrice }, { userId }) => {
    if (quantity < 0) throw new Error('Quantity must be positive');
    const cart = store.getCart(userId);
    cart.items.push({ id, name, quantity, unitPrice });
    store.saveCart(userId, cart);
    return { id, name, quantity, unitPrice };
  },
  updateItem: (_, { id, quantity }, { userId }) => {
    if (quantity < 0) throw new Error('Quantity must be positive');
    const cart = store.getCart(userId);
    const item = cart.items.find(i => i.id === id);
    if (!item) throw new Error('Item not found');
    item.quantity = quantity;
    store.saveCart(userId, cart);
    return item;
  },
  removeItem: (_, { id }, { userId }) => {
    const cart = store.getCart(userId);
    const index = cart.items.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Item not found');
    cart.items.splice(index, 1);
    store.saveCart(userId, cart);
    return `Item ${id} removed`;
  },
  clearCart: (_, __, { userId }) => {
    store.clearCart(userId);
    return 'Cart cleared';
  }
};
