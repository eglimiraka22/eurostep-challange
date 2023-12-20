import React from "react";
import styles from "./Modal.module.css";
import useHomeworld from "../../hooks/useGetHomeworld";
import LoaderSpinner from "../loader";

const Modal = ({ character, onClose }) => {
  function formatDateWithoutMoment(dateString) {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const formattedDate = formatDateWithoutMoment(character.created);

  const { homeworld, loading, error } = useHomeworld(character.homeworld);

  console.log(homeworld);
  if (error) {
    return null;
  }

  if (loading) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <LoaderSpinner />
      </div>
    );
  }
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.characterDetails}>
          <h2>{character.name}</h2>
          <p>Height: {character.height} meters</p>
          <p>Mass: {character.mass} kg</p>
          <p>Date Added: {formattedDate}</p>
          <p>Films: {character.films.length}</p>
          <p>Birth Year: {character.birth_year}</p>
        </div>
        <div className={styles.homeworldData}>
          <h3>Homeworld: {homeworld.name}</h3>
          <p>Terrain: {homeworld.terrain}</p>
          <p>Climate: {homeworld.climate}</p>
          <p>Residents: {homeworld.residents.length}</p>
        </div>
        {/* Add other character details here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
