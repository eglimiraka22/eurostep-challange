// components/SearchFilter.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople, setCurrentQuery } from "../../store/slices/peopleSlice";
import {
  getSpeciesOptions,
  getHomeworldOptions,
  getFilmOptions,
} from "../../services/filterApis";
import {
  setSpeciesFilter,
  setHomeworldFilter,
  setFilmFilter,
} from "../../store/slices/filtersSlice";
import SearchInput from "../UI/SearchInput";
import SelectFilter from "../UI/SelectFilter";
import styles from "./style.module.css"; // Import CSS module
import { logout, selectAuth } from "../../store/slices/authSlice";
import Login from "../login/Login";

const Filter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [homeworldOptions, setHomeworldOptions] = useState([]);
  const [filmOptions, setFilmOptions] = useState([]);
  const [speciesError, setSpeciesError] = useState(null);
  const [homeworldError, setHomeworldError] = useState(null);
  const [filmError, setFilmError] = useState(null);
  const { speciesFilter, homeworldFilter, filmFilter } = useSelector(
    (state) => state.filters,
  );

  const { token } = useSelector(selectAuth);
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
    getSpeciesOptions()
      .then((options) => {
        setSpeciesOptions(options.results);
        setSpeciesError(null);
      })
      .catch((error) => {
        setSpeciesError("Error fetching species options");
        console.error("Error fetching species options:", error);
      });

    // Fetch homeworld options
    getHomeworldOptions()
      .then((options) => {
        setHomeworldOptions(options.results);
        setHomeworldError(null);
      })
      .catch((error) => {
        setHomeworldError("Error fetching homeworld options");
        console.error("Error fetching homeworld options:", error);
      });

    // Fetch film options
    getFilmOptions()
      .then((options) => {
        setFilmOptions(options.results);
        setFilmError(null);
      })
      .catch((error) => {
        setFilmError("Error fetching film options");
        console.error("Error fetching film options:", error);
      });
  }, []); // Run only once on component mount

  if (speciesError || filmError || homeworldError) {
    return <p>There was a problem with Filters Api</p>;
  }
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
      {openLoginMoal && <Login onClick={() => setOpenLoginMoal(false)} />}
    </div>
  );
};

export default Filter;
