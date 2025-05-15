const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat, GraphQLNonNull } = require('graphql');
const resolvers = require('./resolvers');

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
      resolve: resolvers.getCart
    },
    searchItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: resolvers.searchItem
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
      resolve: resolvers.addItem
    },
    updateItem: {
      type: ItemType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        quantity: { type: GraphQLNonNull(GraphQLInt) }
      },
      resolve: resolvers.updateItem
    },
    removeItem: {
      type: GraphQLString,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: resolvers.removeItem
    },
    clearCart: {
      type: GraphQLString,
      resolve: resolvers.clearCart
    },
    searchCart:{
        type:ItemType,
        args:{
            id:{type: GraphQLNonNull(GraphQLString)},
        },
        resolve: resolvers.searchItem
         
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: RootMutation });
