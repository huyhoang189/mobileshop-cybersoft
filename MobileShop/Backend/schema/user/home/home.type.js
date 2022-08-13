const gql = require("graphql-tag");
// const { gql } = require("apollo-server");
const typeDefs = gql`
  type HomeManufactures {
    id: Int
    name: String
    thumbail: String
  }

  type HomeProducts {
    id: Int
    name: String
    thumbail: String
    price: String
    description: String
  }

  input InputSearch {
    keyword: String
    manufactures: [String]
    rangePrice: Int
    sort: String
  }

  type Query {
    manufactures: [HomeManufactures]
    products: [HomeProducts]
    productsMultiSearch(input: InputSearch): [HomeProducts]
  }
`;

module.exports = typeDefs;
