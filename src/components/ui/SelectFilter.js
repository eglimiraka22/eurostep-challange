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
      <div className={styles.selectContainer}>
      <label>{label}:</label>
      <select className={styles.select} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value=''>{`All ${label}`}</option>
        {options.map((option) => (
          <option key={option.url} value={option.url} className={styles.selectOption}>
            {film ? option.title : option.name}
          </option>
        ))}
      </select>
      </div>
    </div>
  );
};

export default SelectFilter;
