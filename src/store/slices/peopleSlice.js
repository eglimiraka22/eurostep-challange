// slices/peopleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPeople } from "../../services/api";

export const fetchPeople = createAsyncThunk(
    "people/fetchPeople",
    async ({ page, query }) => {
      console.log(!query);
      try {
        const response = await getPeople(page, query?  query : undefined);
        return response;
      } catch (error) {
        throw new Error('Error fetching people data');
      }
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
    currentQuery: null, // Add a new variable for the current query

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
      state.error = action.payload.currentQuery;
    },
    setCurrentQuery: (state, action) => {
        state.currentQuery = action.payload.searchQuery;
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
        state.currentPage = action.meta.arg.page; // Update currentPage here
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
   
      
  },
});

export const { fetchPeopleRequest, fetchPeopleSuccess, fetchPeopleFailure , setCurrentQuery, // Add the new action
} =
  peopleSlice.actions;
export const selectPeople = (state) => state.people;
export default peopleSlice.reducer;
