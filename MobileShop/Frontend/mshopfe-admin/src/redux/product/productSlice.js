import { createSlice } from "@reduxjs/toolkit";

const productReducer = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: {
      id: 0,
      name: "",
      thumbail: "",
      desciption: "",
      count: 0,
      price: "",
      serie: {
        id: 0,
        name: "",
        manufacture: {
          id: 0,
          name: "",
        },
      },
    },
    product: {
      id: 0,
      name: "",
      thumbail: "",
      desciption: "",
      count: 0,
      price: "",
      serie: {
        id: 0,
        name: "",
        manufacture: {
          id: 0,
          name: "",
        },
      },
    },
    modalActive: false,
    errorMessage: false,
    manufactures: [],
    series: [],
    selectedManufacture: {
      id: 0,
      name: "",
    },
    selectedSerie: {
      id: 0,
      name: "",
    },
  },
  reducers: {
    getProducts: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    getProductsSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = true;
      state.products = action.payload;
    },
    getProductsError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    handProduct: (state, action) => {
      state.errorMessage = false;
    },
    handProductSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    handProductError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    updateProductInput: (state, action) => {
      state.selectedProduct = action.payload;
    },
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedProduct =
        action.payload == null ? state.product : action.payload;
    },
    getManufactures: (state, action) => {
      state.errorMessage = false;
    },
    getManufacturesSuccess: (state, action) => {
      state.manufactures = action.payload;
      state.errorMessage = false;
    },
    getManufacturesError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    getSerieByIdManufacture: (state, action) => {
      state.errorMessage = false;
    },
    getSerieByIdManufactureSuccess: (state, action) => {
      state.series = action.payload;
      state.errorMessage = false;
    },
    getSerieByIdManufactureError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    updateSelectedManufacture: (state, action) => {
      state.selectedManufacture = action.payload;
    },
    updateSelectedSerie: (state, action) => {
      state.selectedSerie = action.payload;
    },
  },
});

export default productReducer;
