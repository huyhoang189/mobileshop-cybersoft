import { private_url } from "../commonConstant";
const axios = require("axios");

const endpoint = private_url;
const headers = {
  "content-type": "application/json",
  authorization: JSON.parse(localStorage.getItem("jwt")),
};

export const getSeries = () => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        query {
          series {
              __typename
              id
              name
              sort_name
              manufacture {
                  id
                  name
              }
          }
        }`,
      variables: {},
    },
  });
  return response;
};

export const addSerie = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($name: String, $sort_name: String, $manufacture_id: Int) {
          insertSerie (
              name: $name,
              sort_name: $sort_name,
              manufacture_id: $manufacture_id
          )
      }`,
      variables: {
        name: payload.name,
        sort_name: payload.sort_name,
        manufacture_id: payload.manufacture.id,
      },
    },
  });
  return response;
};

export const deleteSerie = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($id: Int) {
            deleteSerie (
                id: $id
            )
        }`,
      variables: {
        id: payload.id,
      },
    },
  });
  return response;
};
