const gql = require("graphql-tag");
// const { gql } = require("apollo-server");
const typeDefs = gql`
  type Series {
    id: Int
    name: String
    sort_name: String
    manufacture: Manufactures
  }

  type Query {
    series: [Series]
    serieById(id: Int): Series
  }

  type Mutation {
    insertSerie(name: String, sort_name: String, manufacture_id: Int): Boolean
    updateSerie(
      id: Int
      name: String
      sort_name: String
      manufacture_id: Int
    ): Boolean
    deleteSerie(id: Int): Boolean
  }
`;

module.exports = typeDefs;
