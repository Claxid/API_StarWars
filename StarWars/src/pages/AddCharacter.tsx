import { useState } from 'react';
import AddCharacterForm from './AddCharacterForm';

interface Character {
  name: string;
  gender: string;
  height: string;
  mass: string;
  birthYear: string;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
}

export default function AddCharacter() {
  const [characters, setCharacters] = useState<Character[]>([]);

  const handleAddCharacter = (newCharacter: Character) => {
    setCharacters((prev) => [...prev, newCharacter]);
  };

  return (
    <main className="add-character-page">
      <h2>Add a character</h2>
      <AddCharacterForm onAdd={handleAddCharacter} />

      {characters.length > 0 && (
        <ul>
          {characters.map((character, index) => (
            <li key={`${character.name}-${index}`}>
              <strong>{character.name}</strong>
              <ul>
                <li>Gender: {character.gender}</li>
                <li>Height: {character.height}</li>
                <li>Mass: {character.mass}</li>
                <li>Birth Year: {character.birthYear}</li>
                <li>Eye Color: {character.eyeColor}</li>
                <li>Hair Color: {character.hairColor}</li>
                <li>Skin Color: {character.skinColor}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
