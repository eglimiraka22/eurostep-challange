// store.js
import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./slices/peopleSlice";
import filtersSlice from "./slices/filtersSlice";
import authSlice from "./slices/authSlice";
const store = configureStore({
  reducer: {
    people: peopleReducer,
    filters: filtersSlice,
    auth: authSlice,
  },
});

export default store;
