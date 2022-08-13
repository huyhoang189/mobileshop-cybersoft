import { createSlice } from "@reduxjs/toolkit";

const serieReducer = createSlice({
  name: "serie",
  initialState: {
    series: [],
    selectedSerie: {
      name: "",
      sort_name: "",
      manufacture: {
        id: 0,
        name: "",
      },
    },
    serie: {
      name: "",
      sort_name: "",
      manufacture: {
        id: 0,
        name: "",
      },
    },
    modalActive: false,
    errorMessage: false,
  },
  reducers: {
    getSeries: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    getSeriesSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = true;
      state.series = action.payload;
    },
    getSeriesError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    handSerie: (state, action) => {
      state.errorMessage = false;
    },
    handSerieSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    handSerieError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    updateSerieInput: (state, action) => {
      state.selectedSerie = action.payload;
    },
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedSerie =
        action.payload == null ? state.serie : action.payload;
    },
  },
});

export default serieReducer;
