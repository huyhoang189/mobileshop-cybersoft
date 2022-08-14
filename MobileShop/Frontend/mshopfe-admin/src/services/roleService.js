import { private_url } from "../commonConstant";
const axios = require("axios");

const endpoint = private_url;
const headers = {
  "content-type": "application/json",
  authorization: JSON.parse(localStorage.getItem("jwt")),
};

export const getRoles = () => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        query {
            roles {
                __typename
                id
                name
            }
        }`,
      variables: {},
    },
  });
  return response;
};

export const addRole = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($name: String) {
            insertRole (
                name: $name
            )
        }`,
      variables: {
        name: payload.name,
      },
    },
  });
  return response;
};

export const deleteRole = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($id: Int) {
            deleteRole (
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
