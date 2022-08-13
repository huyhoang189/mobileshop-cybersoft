import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: {
    users: [],
    selectedUser: {
      id: 0,
      name: "",
      username: "",
      role: {},
      phone_number: "",
    },
    user: {
      id: 0,
      name: "",
      username: "",
      role: {},
      phone_number: "",
    },
    modalActive: false,
    roles: [],
    errorMessage: false,
  },
  reducers: {
    getUsers: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    getUsersSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = true;
      state.users = action.payload;
    },
    getUsersError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    handUser: (state, action) => {
      state.errorMessage = false;
    },
    handUserSuccess: (state, action) => {
      state.modalActive = false;
      state.errorMessage = false;
    },
    handUserError: (state, action) => {
      state.errorMessage = "There is a hand problem";
    },
    updateUserInput: (state, action) => {
      state.selectedUser = action.payload;
    },
    toggleModal: (state, action) => {
      state.modalActive = !state.modalActive;
      state.selectedUser = action.payload == null ? state.user : action.payload;
    },
    getRoles: (state, action) => {},

    getRolesSuccess: (state, action) => {
      state.roles = action.payload;
      state.selectedUser.role = action.payload[0];
      state.user.role = action.payload[0];
    },
  },
});

export default userReducer;
