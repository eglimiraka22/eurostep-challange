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
  setErrorFilters,
  setLoadingFilters,
} from "../../store/slices/filtersSlice";
import SelectFilter from "../UI/SelectFilter";
import styles from "./style.module.css"; // Import CSS module
import { logout, selectAuth } from "../../store/slices/authSlice";
import Login from "../login/Login";
import SearchFilter from "../UI/SearchFilter";

const Filter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [homeworldOptions, setHomeworldOptions] = useState([]);
  const [filmOptions, setFilmOptions] = useState([]);

  const {
    speciesFilter,
    homeworldFilter,
    filmFilter,
    errorFilters,
    loadingFilters,
  } = useSelector((state) => state.filters);

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
    const getAllFilters = () => {
      try {
        dispatch(setLoadingFilters(true));

        getSpeciesOptions()
          .then((options) => {
            setSpeciesOptions(options.results);
          })
          .catch((error) => {
            dispatch(setErrorFilters("Error fetching species options"));
          });

        // Fetch homeworld options
        getHomeworldOptions()
          .then((options) => {
            setHomeworldOptions(options.results);
          })
          .catch((error) => {
            dispatch(setErrorFilters("Error fetching homeworld options"));
          });

        // Fetch film options
        getFilmOptions()
          .then((options) => {
            setFilmOptions(options.results);
          })
          .catch((error) => {
            dispatch(setErrorFilters("Error fetching Films options"));
          });
      } catch (error) {
        dispatch(setErrorFilters("Something went wrong"));
      } finally {
        dispatch(setLoadingFilters(false));
      }
    };
    getAllFilters();
  }, [dispatch]); // Run only once on component mount
  if (errorFilters) {
    return <p>There was a problem with Filters Api</p>;
  }
  console.log(loadingFilters);
  if (loadingFilters) {
    return (
      <div className={styles.searchFilter}>
        <SearchFilter
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder='Enter character name...'
          onSearch={handleSearch}
        />
        <div className={styles.selectContainer}>
          Loading Filters for Star Wars...
        </div>
        <button onClick={handleLoginButtonClick}>
          {token ? "Logout" : "Login"}
        </button>{" "}
        {openLoginMoal && <Login onClick={() => setOpenLoginMoal(false)} />}
      </div>
    );
  }
  return (
    <div className={styles.searchFilter}>
      <SearchFilter
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
