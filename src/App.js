// App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useGetPeople from './hooks/useGetPeople';
// import CharacterModal from './components/CharacterModal';
import { fetchPeople } from './store/slices/peopleSlice';

import CharacterList from './components/characterList';
import LoaderSpinner from './components/loader';

const App = () => {
  const dispatch = useDispatch();
  const { people, totalPages, currentPage, loading, error, nextPage, prevPage } =
    useGetPeople();

  useEffect(() => {
    dispatch(fetchPeople(currentPage));
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    nextPage();
  };

  const handlePrevPage = () => {
    prevPage();
  };

  return (
    <div className={styles.mainPage} >
      <h1>Star Wars Characters</h1>
      {/* <SearchFilter /> */}
      {loading ? (
      <LoaderSpinner/>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <CharacterList characters={people} />
          <div >
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
      {/* <CharacterModal /> */}
    </div>
  );
};

export default App;
