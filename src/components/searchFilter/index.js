// components/SearchFilter.js
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchPeople, setCurrentQuery,selectPeople } from "../../store/slices/peopleSlice";
import { getSpeciesOptions, getHomeworldOptions, getFilmOptions } from '../../services/filterApis';
import {
    setSpeciesFilter,
    setHomeworldFilter,
    setFilmFilter,
    clearFilters,
  } from '../../store/slices/filtersSlice';
const SearchFilter = () => {
     const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [homeworldOptions, setHomeworldOptions] = useState([]);
    const [filmOptions, setFilmOptions] = useState([]);


    const { speciesFilter, homeworldFilter, filmFilter } = useSelector((state) => state.filters);
    console.log("Filders" , speciesFilter)
  const handleSpeciesChange = (event) => {
    dispatch(setSpeciesFilter(event.target.value));
  };

  const handleHomeworldChange = (event) => {
    dispatch(setHomeworldFilter(event.target.value));
  };

  const handleFilmChange = (event) => {
    dispatch(setFilmFilter(event.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleSearch = () => {
    dispatch(setCurrentQuery({searchQuery})); // Dispatch setCurrentQuery action here
    dispatch(fetchPeople({ page: 1, query: searchQuery, speciesFilter, homeworldFilter, filmFilter }));
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


    <div>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Enter character name...'
      />

      <button onClick={handleSearch}>Search</button>

      <select value={speciesFilter} onChange={handleSpeciesChange}>
        <option value="">All Species</option>
        {speciesOptions.map((species) => (
          <option key={species.url} value={species.url}>
            {species.name}
          </option>
        ))}
      </select>
      <select value={homeworldFilter} onChange={ handleHomeworldChange}>
        <option value="">All Homeworlds</option>
        {homeworldOptions.map((homeworld) => (
          <option key={homeworld.url} value={homeworld.url}>
            {homeworld.name}
          </option>
        ))}
      </select>
      <select value={filmFilter} onChange={ handleFilmChange}>
        <option value="">All Films</option>
        {filmOptions.map((film) => (
          <option key={film.url} value={film.url}>
            {film.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
