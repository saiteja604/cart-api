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