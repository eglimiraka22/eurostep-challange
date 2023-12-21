import React from "react";
import styles from "./SearchInput.module.css"; // Import CSS module

const SearchInput = ({ value, onChange, placeholder, onSearch }) => {
  return (
    <div className={styles.searchInput}>
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

export default SearchInput;
