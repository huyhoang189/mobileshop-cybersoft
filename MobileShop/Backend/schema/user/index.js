const authSchema = require("./auth/index");
const homeSchema = require("./home/index");
const merge = require("lodash.merge");
const { makeExecutableSchema } = require("graphql-tools");
const schema = makeExecutableSchema({
  typeDefs: [authSchema.typeDefs, homeSchema.typeDefs],
  resolvers: merge(authSchema.resolver, homeSchema.resolver),
});

module.exports = schema;
