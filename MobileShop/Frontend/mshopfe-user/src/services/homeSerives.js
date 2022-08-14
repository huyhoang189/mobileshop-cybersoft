const axios = require("axios");

const endpoint = "http://103.163.214.134:3000/api/v1/user/";
const headers = {
  "content-type": "application/json",
};

export const getManufactures = () => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        query {
          manufactures {
              __typename
              id
              name
              thumbail
          }
      }`,
      variables: {},
    },
  });
  return response;
};

export const getProducts = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        query {
            products {
                __typename
                id
                name
                thumbail
                price
                description
            }
        }`,
      variables: {},
    },
  });
  return response;
};

export const getProductsMultiSearch = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        query ($input: InputSearch) {
          productsMultiSearch (
              input: $input
          ) {
              __typename
              id
              name
              thumbail
              price
              description
          }
      }`,
      variables: {
        input: {
          keyword: payload.keyword,
          manufactures: payload.manufactures,
          rangePrice: payload.rangePrice,
          sort: payload.sort,
        },
      },
    },
  });
  return response;
};
