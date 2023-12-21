// App.js
import React from "react";
// import CharacterModal from './components/CharacterModal';

import styles from "./index.module.css";
import SearchFilter from "./components/filter";
import { useSelector } from "react-redux";
import { selectAuth } from "./store/slices/authSlice";
import CharactersContainer from "./components/characterList";

const App = () => {
  const { token } = useSelector(selectAuth);
  if (!token) {
    return (
      <div className={styles.mainContainer}>
        <SearchFilter />
        <h1>Login To See the Characters</h1>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <SearchFilter />
      <h1>Star Wars Characters</h1>
      {/* <SearchFilter /> */}
      <CharactersContainer />
      {/* <CharacterModal /> */}
    </div>
  );
};

export default App;
