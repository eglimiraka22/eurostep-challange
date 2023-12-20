// store/slices/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    speciesFilter: "",
    homeworldFilter: "",
    filmFilter: "",
  },
  reducers: {
    setSpeciesFilter: (state, action) => {
      state.speciesFilter = action.payload;
    },
    setHomeworldFilter: (state, action) => {
      state.homeworldFilter = action.payload;
    },
    setFilmFilter: (state, action) => {
      state.filmFilter = action.payload;
    },
    clearFilters: (state) => {
      state.speciesFilter = "";
      state.homeworldFilter = "";
      state.filmFilter = "";
    },
  },
});

export const {
  setSpeciesFilter,
  setHomeworldFilter,
  setFilmFilter,
  clearFilters,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;
export default filtersSlice.reducer;
