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
        <section className="added-characters" aria-label="Added characters">
          {characters.map((character, index) => {
            const details = [
              ['Name', character.name],
              ['Height', character.height, 'cm'],
              ['Gender', character.gender],
              ['Mass', character.mass, 'kg'],
              ['Eyes', character.eyeColor],
              ['Birth year', character.birthYear],
              ['Skin', character.skinColor],
              ['Hair', character.hairColor],
            ];

            return (
              <article className="character-info-card added-character-card" key={`${character.name}-${index}`}>
                <div className="character-card-visual">
                  <span className="character-card-code">LOCAL / {index + 1}</span>
                  <span className="character-card-badge">Added profile</span>
                </div>

                <div className="character-card-body">
                  <span className="detail-kicker">Custom archives</span>
                  <h2>{character.name}</h2>
                  <p>Custom character profile</p>

                  <dl className="detail-list">
                    {details.map(([label, value, unit]) => (
                      <div className="detail-list-item" key={label}>
                        <dt>{label}</dt>
                        <dd>{value || 'Unknown'}{unit && value ? ` ${unit}` : ''}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
