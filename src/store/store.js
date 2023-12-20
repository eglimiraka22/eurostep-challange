// store.js
import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './slices/peopleSlice';
import filtersSlice from './slices/filtersSlice';

const store = configureStore({
  reducer: {
    people: peopleReducer,
    filters:filtersSlice,
  },
});

export default store;
