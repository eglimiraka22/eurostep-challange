// slices/peopleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPeople } from "../../services/api";

export const fetchPeople = createAsyncThunk(
  "people/fetchPeople",
  async ({ page, query, speciesFilter, homeworldFilter, filmFilter }) => {
    try {

        console.log("Fetching people", speciesFilter, homeworldFilter, filmFilter)
      // The asynchronous logic (e.g., API call) is performed here
      const response = await getPeople(page, query);
      const filteredResults = filterResults(response.results, speciesFilter, homeworldFilter, filmFilter);

      return { results: filteredResults, count: response.count };
    } catch (error) {
      throw new Error("Error fetching people data");
    }
  }
);

// Helper function to filter results based on criteria
const filterResults = (results, speciesFilter, homeworldFilter, filmFilter) => {
  return results.filter((character) => {
    // Filter by species
    if (speciesFilter && character.species.indexOf(speciesFilter) === -1) {
      return false;
    }

    // Filter by homeworld
    if (homeworldFilter && character.homeworld.indexOf(homeworldFilter) === -1) {
      return false;
    }

    // Filter by films
    if (filmFilter) {
      const films = character.films.map((film) => film.toLowerCase());
      if (films.indexOf(filmFilter.toLowerCase()) === -1) {
        return false;
      }
    }

    // Add more filters as needed

    return true;
  });
};

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
        state.loading = false;
        state.error = null;
        state.currentPage = action.meta.arg.page; // Update currentPage here

        // Check if there are active filters
    const { speciesFilter, homeworldFilter, filmFilter } = action.meta.arg;
    if (speciesFilter || homeworldFilter || filmFilter) {
      // Update totalCount based on the length of filtered results
      state.totalCount = action.payload.results.length;

      // Update totalPages based on the length of filtered results (assuming 10 items per page)
      state.totalPages = Math.ceil(action.payload.results.length / 10);
    } else {
      // Update totalCount based on the original count from the API
      state.totalCount = action.payload.count;

      // Update totalPages based on the original count from the API (assuming 10 items per page)
      state.totalPages = Math.ceil(action.payload.count / 10);
    }
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentQuery } = peopleSlice.actions;
export const selectPeople = (state) => state.people;
export default peopleSlice.reducer;
