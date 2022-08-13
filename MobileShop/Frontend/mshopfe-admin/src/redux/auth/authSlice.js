import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idToken: false,
  errorMessage: false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkAuthorization: (state, action) => {},
    login: (state, action) => {},
    loginSuccess: (state, action) => {
      state.idToken = action.payload;
      state.errorMessage = false;
    },
    loginError: (state, action) => {
      state.idToken = false;
      state.errorMessage = true;
    },
    logout: (state, action) => {},
  },
});

export default userReducer;
