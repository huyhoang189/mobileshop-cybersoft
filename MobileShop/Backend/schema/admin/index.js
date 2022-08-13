const roleSchema = require("./roles/index");
const userSchema = require("./users/index");
const manufactureSchema = require("./manufactures/index");
const productSchema = require("./products/index");
const serieSchema = require("./series/index");
// const { buildFederatedSchema } = require("@apollo/federation");
const merge = require("lodash.merge");
const { makeExecutableSchema } = require("graphql-tools");

const schema = makeExecutableSchema({
  typeDefs: [
    roleSchema.typeDefs,
    userSchema.typeDefs,
    manufactureSchema.typeDefs,
    productSchema.typeDefs,
    serieSchema.typeDefs,
  ],
  resolvers: merge(
    roleSchema.resolver,
    userSchema.resolver,
    manufactureSchema.resolver,
    productSchema.resolver,
    serieSchema.resolver
  ),
});

module.exports = schema;
