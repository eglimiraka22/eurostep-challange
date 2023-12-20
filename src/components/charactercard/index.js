// components/CharacterCard.js
import React from 'react';
import styles from './style.module.css';

const CharacterCard = ({ character, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{character.name}</h3>
      {/* Add other information and styling based on character properties */}
    </div>
  );
};

export default CharacterCard;
