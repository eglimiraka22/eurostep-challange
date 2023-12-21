import React from "react";
import CharacterList from "./CharacterList";
import useGetPeople from "../../hooks/useGetPeople";
import styles from "./style.module.css";
import LoaderSpinner from "../loader";
const CharactersContainer = () => {
  const {
    people,
    totalPages,
    currentPage,
    loading,
    error,
    nextPage,
    prevPage,
  } = useGetPeople();
  const handleNextPage = () => {
    nextPage();
  };

  const handlePrevPage = () => {
    prevPage();
  };
  if (loading) {
    return (
      <div className={styles.mainContainerList}>
        <LoaderSpinner />
      </div>
    );
  }
  if (error) {
    <div className={styles.mainContainerList}>
      <p>Error: {error} ,Try Again</p>
    </div>;
  }

  return (
    <div className={styles.mainContainerList}>
      <CharacterList characters={people} />
      <div className={styles.paginationContainer}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharactersContainer;
