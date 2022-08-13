import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    selectedRole: {
      id: 0,
      name: "",
    },
    role: {
      id: 0,
      name: "",
    },
    modalActive: false,
    roles: [],
    errorMessage: false,
  },
  reducers: {
    getRoles: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    getRolesSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = true;
      state.roles = action.payload;
    },
    getRolesError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },

    handRole: (state, action) => {
      state.errorMessage = false;
    },
    handRoleSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    handRoleError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    updateRoleInput: (state, action) => {
      state.selectedRole = action.payload;
    },
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedRole = action.payload == null ? state.role : action.payload;
    },
  },
});

export default userReducer;
