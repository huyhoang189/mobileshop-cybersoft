const axios = require("axios");

const endpoint = "http://localhost:3000/api/v1/user/";
const headers = {
  "content-type": "application/json",
};

export const login = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($username: String, $password: String) {
            login (
                username: $username,
                password: $password
            ) {
                __typename
                token
                role_name
            }
        }`,
      variables: {
        username: payload.username,
        password: payload.password,
      },
    },
  });
  return response;
};
