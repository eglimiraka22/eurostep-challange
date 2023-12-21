// slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import fakeAuthService from "../../services/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    token: localStorage.getItem("token") || null,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.authenticated = true;
      state.token = action.payload;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.authenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

export const loginAsync = (username, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const result = await fakeAuthService.login(username, password);
    dispatch(loginSuccess(result));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
