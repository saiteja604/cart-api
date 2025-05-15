const carts = new Map(); // key: userId, value: { items: [] }

module.exports = {
  getCart(userId) {
    if (!carts.has(userId)) carts.set(userId, { items: [] });
    return carts.get(userId);
  },
  saveCart(userId, cart) {
    carts.set(userId, cart);
  },
  clearCart(userId) {
    carts.set(userId, { items: [] });
  }
};
