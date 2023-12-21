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
import SearchInput from "../UI/SearchInput";
import SelectFilter from "../UI/SelectFilter";
import styles from "./style.module.css"; // Import CSS module
import { logout } from "../../store/slices/authSlice";
import Login from "../login/Login";

const Filter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [homeworldOptions, setHomeworldOptions] = useState([]);
  const [filmOptions, setFilmOptions] = useState([]);

  const { speciesFilter, homeworldFilter, filmFilter } = useSelector(
    (state) => state.filters,
  );

  const { token } = useSelector((state) => state.auth);
  const [openLoginMoal, setOpenLoginMoal] = useState(false);
  const handleLoginButtonClick = () => {
    // If there is no token, dispatch an action to open the login modal
    if (!token) {
      setOpenLoginMoal(true);
    } else {
      setOpenLoginMoal(false);

      // If there is a token, you can perform any other action (e.g., logout)
      dispatch(logout());
    }
  };

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
      <div className={styles.selectContainer}>
        <SelectFilter
          value={speciesFilter}
          onChange={(value) => dispatch(setSpeciesFilter(value))}
          options={speciesOptions}
          placeholder='All species'
          label='Species'
        />
        <SelectFilter
          value={homeworldFilter}
          onChange={(value) => dispatch(setHomeworldFilter(value))}
          options={homeworldOptions}
          placeholder='All Homeworlds'
          label='Homeworlds'
        />
        <SelectFilter
          value={filmFilter}
          onChange={(value) => dispatch(setFilmFilter(value))}
          options={filmOptions}
          placeholder='All Films'
          label='Films'
          film={true}
        />
      </div>
      <button onClick={handleLoginButtonClick}>
        {token ? "Logout" : "Login"}
      </button>{" "}
      {openLoginMoal && (
        <div className={styles.loginModalContainer}>
          <Login />
        </div>
      )}
    </div>
  );
};

export default Filter;
