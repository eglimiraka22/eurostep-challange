import React from "react";
import styles from "./SelectFilter.module.css"; // Import CSS module

const SelectFilter = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  film,
}) => {
  return (
    <div className={styles.searchSelect}>
      <label>{label}:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value=''>{`All ${label}s`}</option>
        {options.map((option) => (
          <option key={option.url} value={option.url}>
            {film ? option.title : option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
