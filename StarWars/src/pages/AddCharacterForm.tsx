import { useState } from 'react';

interface NewCharacter {
  name: string;
  gender: string;
  height: string;
  mass: string;
  birthYear: string;
  eyeColor: string;
  hairColor: string;
  skinColor: string;
}

interface AddCharacterFormProps {
  onAdd: (newCharacter: NewCharacter) => void;
}

export default function AddCharacterForm({ onAdd }: AddCharacterFormProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [mass, setMass] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [skinColor, setSkinColor] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    onAdd({
      name: trimmedName,
      gender,
      height,
      mass,
      birthYear,
      eyeColor,
      hairColor,
      skinColor,
    });

    setName('');
    setGender('n/a');
    setHeight('167');
    setMass('75');
    setBirthYear('112BBY');
    setEyeColor('yellow');
    setHairColor('n/a');
    setSkinColor('gold');
  };

  return (
    <form className="add-character-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="character-name">Nom du personnage</label>
        <input
          id="character-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nom du personnage"
        />
      </div>

      <div className="form-field">
        <label htmlFor="character-gender">Genre</label>
        <input id="character-gender" type="text" value={gender} onChange={(event) => setGender(event.target.value)} />
      </div>

      <div className="form-field">
        <label htmlFor="character-height">Taille</label>
        <input id="character-height" type="text" value={height} onChange={(event) => setHeight(event.target.value)} />
      </div>

      <div className="form-field">
        <label htmlFor="character-mass">Poids</label>
        <input id="character-mass" type="text" value={mass} onChange={(event) => setMass(event.target.value)} />
      </div>

      <div className="form-field">
        <label htmlFor="character-birth-year">Année de naissance</label>
        <input id="character-birth-year" type="text" value={birthYear} onChange={(event) => setBirthYear(event.target.value)} />
      </div>

      <div className="form-field">
        <label htmlFor="character-eye-color">Couleur des yeux</label>
        <input id="character-eye-color" type="text" value={eyeColor} onChange={(event) => setEyeColor(event.target.value)} />
      </div>

      <div className="form-field">
        <label htmlFor="character-hair-color">Couleur des cheveux</label>
        <input id="character-hair-color" type="text" value={hairColor} onChange={(event) => setHairColor(event.target.value)} />
      </div>

      <div className="form-field">
        <label htmlFor="character-skin-color">Couleur de peau</label>
        <input id="character-skin-color" type="text" value={skinColor} onChange={(event) => setSkinColor(event.target.value)} />
      </div>

      <div className="form-action">
        <button type="submit">Ajouter</button>
      </div>
    </form>
  );
}