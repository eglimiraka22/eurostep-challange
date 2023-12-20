// components/CharacterCard.js
import React from "react";
import styles from "./style.module.css";

const CharacterCard = ({ character, onClick }) => {
  return (
    <div
      className={styles.characterCard}
      onClick={onClick}
      style={{ backgroundColor: `${character.eye_color}` }}
    >
      <div className={styles.characterData}>
        <h3 className={styles.characterName}>{character.name}</h3>
        <p>Birth Year {character.birth_year}</p>
        <p>Hair Color {character.hair_color}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
