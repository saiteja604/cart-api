const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLNonNull } = require('graphql');
const resolvers = require('./valid_error');
const valid_error = require('./valid_error');

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: {
    id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    quantity: { type: GraphQLInt },
    unitPrice: { type: GraphQLFloat }
  }
});

const CartType = new GraphQLObjectType({
  name: 'Cart',
  fields: {
    items: { type: GraphQLList(ItemType) },
    total: { type: GraphQLFloat }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getCart: {
      type: CartType,
      resolve: valid_error.getCart
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
        quantity: { type: GraphQLNonNull(GraphQLInt) },
        unitPrice: { type: GraphQLNonNull(GraphQLFloat) }
      },
      resolve: valid_error.addItem
    },
    updateItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        quantity: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: valid_error.updateItem
    },
    removeItem: {
      type: GraphQLString,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: valid_error.removeItem
    },
    clearCart: {
      type: GraphQLString,
      resolve: valid_error.clearCart
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: RootMutation });
