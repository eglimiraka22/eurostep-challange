// components/SearchFilter.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPeople,
  setCurrentQuery,
  selectPeople,
} from "../../store/slices/peopleSlice";
import {
  getSpeciesOptions,
  getHomeworldOptions,
  getFilmOptions,
} from "../../services/filterApis";
import {
  setSpeciesFilter,
  setHomeworldFilter,
  setFilmFilter,
  clearFilters,
} from "../../store/slices/filtersSlice";
import SearchInput from "../ui/SearchInput";
import SelectFilter from "../ui/SelectFilter";
import styles from "./style.module.css"; // Import CSS module

const Filter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [homeworldOptions, setHomeworldOptions] = useState([]);
  const [filmOptions, setFilmOptions] = useState([]);

  const { speciesFilter, homeworldFilter, filmFilter } = useSelector(
    (state) => state.filters,
  );
  console.log("Filters", speciesFilter);

  const handleSearch = () => {
    dispatch(setCurrentQuery({ searchQuery })); // Dispatch setCurrentQuery action here
    dispatch(
      fetchPeople({
        page: 1,
        query: searchQuery,
        speciesFilter,
        homeworldFilter,
        filmFilter,
      }),
    );
  };

  useEffect(() => {
    // Fetch species options
    getSpeciesOptions().then((options) => {
      setSpeciesOptions(options.results);
    });

    // Fetch homeworld options
    getHomeworldOptions().then((options) => {
      setHomeworldOptions(options.results);
    });

    // Fetch film options
    getFilmOptions().then((options) => {
      setFilmOptions(options.results);
    });
  }, []); // Run only once on component mount
  return (
    <div className={styles.searchFilter}>
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder='Enter character name...'
        onSearch={handleSearch}
      />
      <div>
        <SelectFilter
          value={speciesFilter}
          onChange={(value) => dispatch(setSpeciesFilter(value))}
          options={speciesOptions}
          placeholder='All Species'
          label='Species'
        />
        <SelectFilter
          value={homeworldFilter}
          onChange={(value) => dispatch(setHomeworldFilter(value))}
          options={homeworldOptions}
          placeholder='All Homeworlds'
          label='Homeworld'
        />
        <SelectFilter
          value={filmFilter}
          onChange={(value) => dispatch(setFilmFilter(value))}
          options={filmOptions}
          placeholder='All Films'
          label='Film'
          film={true}
        />
      </div>
    </div>
  );
};

export default Filter;
