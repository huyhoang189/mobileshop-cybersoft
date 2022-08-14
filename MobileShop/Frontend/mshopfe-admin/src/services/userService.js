import { private_url } from "../commonConstant";
const axios = require("axios");

const endpoint = private_url;
const headers = {
  "content-type": "application/json",
  authorization: JSON.parse(localStorage.getItem("jwt")),
};
const getUsersQuery = {
  query: `query {users {id,name,username,phone_number,role {id,name}}}`,
  variables: {},
};

export const getUsers = () => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `query {users {id,name,username,phone_number,role {id,name}}}`,
      variables: {},
    },
  });
  return response;
};

export const addUser = (payload) => {
  console.log(payload);
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `mutation {insertUser(name : "${payload.name}",password : "${payload.password}", role_id :  ${payload.role.id}, username :  "${payload.username}", phone_number :  "${payload.phone_number}")}`,
      variables: {},
    },
  });
  return response;
};

export const deleteUser = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `mutation {deleteUser(id : ${payload.id})}`,
      variables: {},
    },
  });
  return response;
};
