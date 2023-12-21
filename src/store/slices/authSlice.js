// slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fakeAuthService from "../../services/auth";

// Async thunk for login
export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials, { dispatch }) => {
    try {
      dispatch(loginStart());
      const result = await fakeAuthService.login(
        credentials.username,
        credentials.password,
      );
      dispatch(loginSuccess(result));
      return result; // This value will be available in the fulfilled action payload
    } catch (error) {
      dispatch(loginFailure(error.message));
      throw error; // Rethrow the error to let the component handle it if needed
    }
  },
);

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
  extraReducers: (builder) => {
    // Add any additional reducers here if needed
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
