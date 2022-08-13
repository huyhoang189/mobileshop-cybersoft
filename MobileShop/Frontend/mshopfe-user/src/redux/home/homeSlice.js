import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    manufactures: [],
    products: [],
    errorMessage: false,
    searchOptions: {
      manufactures: [],
      rangePrice: 1,
      keyword: "",
      sort: "DESC",
    },
  },
  reducers: {
    getManufactures: (state, action) => {
      state.errorMessage = false;
    },
    getManufacturesSuccess: (state, action) => {
      state.errorMessage = true;
      state.manufactures = action.payload;
    },
    getManufacturesError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    getProducts: (state, action) => {
      state.errorMessage = false;
    },
    getProductsSuccess: (state, action) => {
      state.errorMessage = true;
      state.products = action.payload;
    },
    getProductsError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    updateSearchOptions: (state, action) => {
      state.searchOptions = action.payload;
    },
  },
});

export default userReducer;
