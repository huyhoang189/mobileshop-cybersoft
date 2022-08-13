const gql = require("graphql-tag");
// const { gql } = require("apollo-server");
const typeDefs = gql`
  type Manufactures {
    id: Int
    name: String
    description: String
    thumbail: String
    serie: [Series]
  }

  type Query {
    manufactures: [Manufactures]
    manufactureById(id: Int): Manufactures
  }

  type Mutation {
    insertManufacture(
      name: String
      description: String
      thumbail: String
    ): Boolean
    updateManufacture(
      id: Int
      name: String
      description: String
      thumbail: String
    ): Boolean
    deleteManufacture(id: Int): Boolean
  }
`;

module.exports = typeDefs;
