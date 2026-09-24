import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, saveFavorites, type FavoriteCharacter } from '../utils/favorites';

export default function Selection() {
  const [favorites, setFavorites] = useState<FavoriteCharacter[]>(getFavorites);

  const removeFavorite = (uid: string) => {
    const nextFavorites = favorites.filter((favorite) => favorite.uid !== uid);
    setFavorites(nextFavorites);
    saveFavorites(nextFavorites);
  };

  return (
    <main className="characters-page selection-page">
      <header className="characters-header">
        <p className="eyebrow">Your galactic archive</p>
        <h1>My Selection</h1>
        <p>{favorites.length} character{favorites.length === 1 ? '' : 's'} saved.</p>
      </header>

      {favorites.length === 0 ? (
        <section className="selection-empty">
          <h2>Your selection is empty</h2>
          <p>Add your favorite characters from the character list.</p>
          <Link to="/characters" className="character-detail-button">View characters</Link>
        </section>
      ) : (
        <ul className="characters-grid">
          {favorites.map((favorite) => (
            <li className="character-card" key={favorite.uid}>
              <div className="character-card-content">
                <span className="character-number">{favorite.uid}</span>
                <h2>{favorite.name}</h2>
                <span className="character-gender">Favorite</span>
              </div>

              <div className="character-card-actions">
                <Link to={`/characters/${favorite.uid}`} className="character-detail-button">
                  View profile
                </Link>
                <button
                  type="button"
                  className="selection-remove-button"
                  onClick={() => removeFavorite(favorite.uid)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
