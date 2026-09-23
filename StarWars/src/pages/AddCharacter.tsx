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
      <h2>Ajouter un personnage</h2>
      <AddCharacterForm onAdd={handleAddCharacter} />

      {characters.length > 0 && (
        <ul>
          {characters.map((character, index) => (
            <li key={`${character.name}-${index}`}>
              <strong>{character.name}</strong>
              <ul>
                <li>Genre : {character.gender}</li>
                <li>Taille : {character.height}</li>
                <li>Poids : {character.mass}</li>
                <li>Année de naissance : {character.birthYear}</li>
                <li>Couleur des yeux : {character.eyeColor}</li>
                <li>Couleur des cheveux : {character.hairColor}</li>
                <li>Couleur de peau : {character.skinColor}</li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
