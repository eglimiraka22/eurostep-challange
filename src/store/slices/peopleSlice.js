// slices/peopleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPeople } from "../../services/api";

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async (page) => {
    return getPeople(page);
  },
);
const peopleSlice = createSlice({
  name: "people",
  initialState: {
    data: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    fetchPeopleRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPeopleSuccess: (state, action) => {
      state.data = action.payload.results;
      state.totalPages = Math.ceil(action.payload.count / 10);
      state.loading = false;
      state.error = null;
    },
    fetchPeopleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        state.data = action.payload.results;
        state.totalPages = Math.ceil(action.payload.count / 10);
        state.loading = false;
        state.error = null;
        state.currentPage = action.meta.arg; // Update currentPage here
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { fetchPeopleRequest, fetchPeopleSuccess, fetchPeopleFailure } =
  peopleSlice.actions;
export const selectPeople = (state) => state.people;
export default peopleSlice.reducer;
