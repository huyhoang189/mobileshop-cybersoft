const gql = require("graphql-tag");
// const { gql } = require("apollo-server");
const typeDefs = gql`
  type Products {
    id: Int
    name: String
    thumbail: String
    description: String
    count: Int
    price: String
    serie: Series
  }

  type Query {
    products: [Products]
    productById(id: Int): Products
  }

  type Mutation {
    insertProduct(
      name: String
      thumbail: String
      description: String
      count: Int
      price: String
      serie_id: Int
    ): Boolean
    updateProduct(
      id: Int
      name: String
      thumbail: String
      description: String
      count: Int
      price: String
      serie_id: Int
    ): Boolean
    deleteProduct(id: Int): Boolean
  }
`;

module.exports = typeDefs;
