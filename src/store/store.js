// store.js
import { configureStore } from '@reduxjs/toolkit';
import peopleReducer from './slices/peopleSlice';

const store = configureStore({
  reducer: {
    people: peopleReducer,
  },
});

export default store;
