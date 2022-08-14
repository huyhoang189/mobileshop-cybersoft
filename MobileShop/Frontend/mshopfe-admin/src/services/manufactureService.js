import { private_url } from "../commonConstant";
const axios = require("axios");

const endpoint = private_url;
const headers = {
  "content-type": "application/json",
  authorization: JSON.parse(localStorage.getItem("jwt")),
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
                description
                thumbail
            }
        }`,
      variables: {},
    },
  });
  return response;
};

export const addManufacture = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($name: String, $description: String, $thumbail: String) {
            insertManufacture (
                name: $name,
                description: $description,
                thumbail: $thumbail,
            )
        }`,
      variables: {
        name: payload.name,
        description: payload.description,
        thumbail: payload.thumbail,
      },
    },
  });
  return response;
};

export const deleteManufacture = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($id: Int) {
            deleteManufacture (
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
