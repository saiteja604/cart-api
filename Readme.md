This is a lightweight HTTP API built with **Node.js**, **Express**, and **GraphQL**.

The API supports operations to manage a shopping cart for each user n, including adding, updating, removing items, and viewing the cart's contents.


This code specifically does this
Create and manage a user-specific cart
Add items (id, name, quantity, unit price)
List all items in the cart with running total
-Update quantity of items
Remove individual items
(Bonus) Clear the entire cart

I used this technolgies
- Node.js
- Express.js
- GraphQL (`express-graphql`)
- In-Memory Store (`Map` per user token)
- Jest + Supertest for Integration/Unit testing
use this graphql commands
- query {
  searchItem(id: "1") {
    id
    name
    quantity
    unitPrice
  }
}
mutation {
  addItem(id: "1", name: "Pen", quantity: 2, unitPrice: 1.5) {
    id
    name
    quantity
    unitPrice
  }
}
mutation {
  updateItem(id: "1", quantity: 5) {
    id
    quantity
  }
}
mutation {
  removeItem(id: "1")
}
query {
  getCart {
    items {
      id
      name
      quantity
      unitPrice
    }
    total
  }
}
