import React from "react";
import styles from "./SearchFilter.module.css"; // Import CSS module

const SearchFilter = ({ value, onChange, placeholder, onSearch }) => {
  return (
    <div className={styles.SearchFilter}>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchFilter;
