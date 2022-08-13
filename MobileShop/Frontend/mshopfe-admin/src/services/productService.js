const axios = require("axios");
const endpoint = process.env.REACT_PATH_ADMIN;
const headers = {
  "content-type": "application/json",
};

export const getProducts = () => {
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
            description
            count
            price
            serie {
                id
                name
                manufacture {
                    id
                    name
                }
            }
        }
    }`,
      variables: {},
    },
  });
  return response;
};

export const addProduct = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($name: String, $thumbail: String, $description: String, $count: Int, $price: String, $serie_id: Int) {
          insertProduct (
              name: $name,
              thumbail: $thumbail,
              description: $description,
              count: $count,
              price: $price,
              serie_id: $serie_id
          )
        }`,
      variables: {
        name: payload.name,
        thumbail: payload.thumbail,
        description: payload.description ? payload.description : "",
        count: payload.count,
        price: payload.price,
        serie_id: payload.serie_id,
      },
    },
  });
  return response;
};

export const updateProduct = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
        mutation ($id: Int, $name: String, $thumbail: String, $description: String, $count: Int, $price: String, $serie_id: Int) {
          updateProduct (
              id: $id,
              name: $name,
              thumbail: $thumbail,
              description: $description,
              count: $count,
              price: $price,
              serie_id: $serie_id
          )
      }`,
      variables: {
        id: payload.id,
        name: payload.name,
        thumbail: payload.thumbail,
        description: payload.description ? payload.description : "",
        count: payload.count,
        price: payload.price,
        serie_id: payload.serie_id,
      },
    },
  });
  return response;
};

export const deleteProduct = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
          mutation ($id: Int) {
            deleteProduct (
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

export const getManufactures = (payload) => {
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
          }
      }`,
      variables: {},
    },
  });
  return response;
};

export const getSerieByIdManufacture = (payload) => {
  let response = axios({
    url: endpoint,
    method: "post",
    headers: headers,
    data: {
      query: `
      query ($id: Int) {
        manufactureById (
            id: $id
        ) {
            __typename
            id
            name
            serie {
                id
                name
            }
        }
    }`,
      variables: {
        id: payload.id,
      },
    },
  });
  return response;
};
