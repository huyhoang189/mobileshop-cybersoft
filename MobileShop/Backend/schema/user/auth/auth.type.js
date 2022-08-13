const gql = require("graphql-tag");
// const { gql } = require("apollo-server");
const typeDefs = gql`
  type Query {
    test: String
  }

  type Auth {
    token: String
    role_name: String
  }
  type Mutation {
    login(username: String, password: String): Auth
  }
`;

module.exports = typeDefs;
