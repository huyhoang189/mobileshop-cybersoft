const gql = require("graphql-tag");
// const { gql } = require("apollo-server");
const typeDefs = gql`
  type User {
    id: Int
    name: String
    username: String
    role: Roles
    phone_number: String
    password: String
  }

  extend type Query {
    users: [User]
    userById(id: Int): User
  }

  extend type Mutation {
    insertUser(
      name: String
      password: String
      role_id: Int
      username: String
      phone_number: String
    ): Boolean
    updateUser(
      id: Int
      name: String
      password: String
      role_id: Int
      username: String
      phone_number: String
    ): Boolean
    deleteUser(id: Int): Boolean
  }
`;

module.exports = typeDefs;
