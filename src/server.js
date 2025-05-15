const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();
const PORT = 4000;

// Middleware to simulate user auth from bearer token
app.use((req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    req.userId = token || 'testuser123'; // 👈 fallback if no token
    next();
  });

app.use('/graphql', graphqlHTTP(req => ({
  schema,
  graphiql: true,
  context: { userId: req.userId }
})));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/graphql`));
