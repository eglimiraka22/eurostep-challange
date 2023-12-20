// components/CharacterList.js
import React from 'react';
import CharacterCard from '../charactercard/index';

const CharacterList = ({ characters, onClick }) => {
  return (
    <div>
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character}  />
      ))}
    </div>
  );
};

export default CharacterList;
