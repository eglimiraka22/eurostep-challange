// components/SearchFilter.js
import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchPeople, setCurrentQuery,selectPeople } from "../../store/slices/peopleSlice";

const SearchFilter = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearch = () => {
    dispatch(setCurrentQuery({searchQuery})); // Dispatch setCurrentQuery action here
    dispatch(fetchPeople({ page: 1, query: searchQuery }));
  };

  return (


    <div>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Enter character name...'
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;
