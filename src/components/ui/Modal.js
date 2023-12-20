import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ character, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{character.name}</h2>
        {/* Add other character details here */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
