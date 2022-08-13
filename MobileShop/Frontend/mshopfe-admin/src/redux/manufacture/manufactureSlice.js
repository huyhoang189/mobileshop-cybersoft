import { createSlice } from "@reduxjs/toolkit";

const manufactureReducer = createSlice({
  name: "manufacture",
  initialState: {
    manufactures: [],
    selectedManufacture: {
      id: 0,
      name: "",
      description: "",
      thumbail: "",
    },
    manufacture: {
      id: 0,
      name: "",
      description: "",
      thumbail: "",
    },
    modalActive: false,
    errorMessage: false,
  },
  reducers: {
    getManufactures: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    getManufacturesSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = true;
      state.manufactures = action.payload;
    },
    getManufacturesError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    handManufacture: (state, action) => {
      state.errorMessage = false;
    },
    handManufactureSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    handManufactureError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    updateManufactureInput: (state, action) => {
      state.selectedManufacture = action.payload;
    },
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedManufacture =
        action.payload == null ? state.manufacture : action.payload;
    },
  },
});

export default manufactureReducer;
