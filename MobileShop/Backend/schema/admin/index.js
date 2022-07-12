const { makeExecutableSchema } = require("graphql-tools");
const merge = require("lodash.merge");
const roleSchema = require("./roles/index");

const schema = makeExecutableSchema({
  typeDefs: [roleSchema.typeDefs],
  resolvers: merge(roleSchema.resolver),
});

module.exports = schema;
