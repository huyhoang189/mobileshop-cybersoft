const axios = require("axios");

const endpoint = process.env.REACT_PATH_ADMIN;
const headers = {
  "content-type": "application/json",
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
