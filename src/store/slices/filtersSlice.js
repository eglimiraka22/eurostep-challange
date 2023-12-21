// store/slices/filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    speciesFilter: "",
    homeworldFilter: "",
    filmFilter: "",
    errorFilters: null,
    loadingFilters: false,
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

    setLoadingFilters: (state, action) => {
      console.log("Loading state", action.payload);
      state.loadingFilters = action.payload;
    },
    setErrorFilters: (state, action) => {
      state.loadingFilters = action.payload;
    },
  },
});

export const {
  setSpeciesFilter,
  setHomeworldFilter,
  setFilmFilter,
  clearFilters,
  setErrorFilters,
  setLoadingFilters,
} = filtersSlice.actions;

export const selectFilters = (state) => state.filters;
export default filtersSlice.reducer;
