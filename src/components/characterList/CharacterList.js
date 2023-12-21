// components/CharacterList.js
import React, { useState } from "react";
import CharacterCard from "../charactercard/index";
import styles from "./style.module.css";
import Modal from "../UI/Modal";
const CharacterList = ({ characters, onClick }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (character) => {
    setOpenModal(true);
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setOpenModal(false);

    setSelectedCharacter(null);
  };
  return (
    <>
      <div className={styles.charactersContainer}>
        {characters.map((character) => (
          <CharacterCard
            key={character.name}
            character={character}
            onClick={() => handleOpenModal(character)}
          />
        ))}
      </div>
      {selectedCharacter && openModal && (
        <Modal character={selectedCharacter} onClose={closeModal} />
      )}
    </>
  );
};

export default CharacterList;
