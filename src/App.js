// App.js
import React from "react";
import useGetPeople from "./hooks/useGetPeople";
// import CharacterModal from './components/CharacterModal';
import CharacterList from "./components/characterList";
import LoaderSpinner from "./components/loader";
import styles from "./index.module.css";
import SearchFilter from "./components/filter";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
const App = () => {
  const {
    people,
    totalPages,
    currentPage,
    loading,
    error,
    nextPage,
    prevPage,
  } = useGetPeople();
  console.log(people);
  const handleNextPage = () => {
    nextPage();
  };

  const handlePrevPage = () => {
    prevPage();
  };

  return (
    <div className={styles.mainContainer}>
      <SearchFilter />
      <h1>Star Wars Characters</h1>
      {/* <SearchFilter /> */}
      {loading ? (
        <LoaderSpinner />
      ) : error ? (
        <p>Error: {error} ,Try Again</p>
      ) : (
        <>
          <CharacterList characters={people} />
          <div className={styles.paginationContainer}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
      {/* <CharacterModal /> */}
      <Login />
      <Logout />
    </div>
  );
};

export default App;
