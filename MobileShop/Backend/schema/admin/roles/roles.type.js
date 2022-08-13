const gql = require("graphql-tag");
// const { gql } = require("apollo-server");
const typeDefs = gql`
  type Roles {
    id: Int
    name: String
  }

  type Query {
    roles: [Roles]
    roleById(id: Int): Roles
  }

  type Mutation {
    insertRole(name: String): Boolean
    updateRole(id: Int, name: String): Boolean
    deleteRole(id: Int): Boolean
  }
`;

module.exports = typeDefs;
