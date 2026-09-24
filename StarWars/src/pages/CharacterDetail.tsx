import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getFavorites, saveFavorites, type FavoriteCharacter } from '../utils/favorites';

interface CharacterDetailData {
  uid: string;
  name: string;
  description: string;
  properties?: {
    name?: string;
    height?: string;
    mass?: string;
    gender?: string;
    birth_year?: string;
    eye_color?: string;
    hair_color?: string;
    skin_color?: string;
  };
}

interface CharacterApiResponse {
  result?: {
    properties?: CharacterDetailData['properties'];
    uid?: string;
    name?: string;
    description?: string;
  };
}

export default function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState<CharacterDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteCharacter[]>(getFavorites);

  useEffect(() => {
    if (!id) {
      setError('No character selected.');
      setLoading(false);
      return;
    }

    const fetchCharacter = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
        if (!response.ok) {
          throw new Error('Character not found');
        }

        const data: CharacterApiResponse = await response.json();
        const result = data.result;

        if (!result) {
          throw new Error('No data received for this character');
        }

        setCharacter({
          uid: result.uid ?? id,
          name: result.properties?.name ?? result.name ?? 'Character',
          description: result.description ?? 'No description available.',
          properties: result.properties ?? {},
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <main className="character-detail-page character-detail-state">
        <span className="detail-kicker">Galactic archives</span>
        <p>Loading profile...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="character-detail-page character-detail-state">
        <span className="detail-kicker">Navigation error</span>
        <h1>Profile unavailable</h1>
        <p>{error}</p>
        <Link className="detail-back-link" to="/characters">Back to characters</Link>
      </main>
    );
  }

  if (!character) {
    return (
      <main className="character-detail-page character-detail-state">
        <h1>Profile not found</h1>
        <Link className="detail-back-link" to="/characters">Back to characters</Link>
      </main>
    );
  }

  const details: [string, unknown, string?][] = [
    ['Name', character.properties?.name],
    ['Height', character.properties?.height, 'cm'],
    ['Gender', character.properties?.gender],
    ['Mass', character.properties?.mass, 'kg'],
    ['Eyes', character.properties?.eye_color],
    ['Birth year', character.properties?.birth_year],
    ['Skin', character.properties?.skin_color],
    ['Hair', character.properties?.hair_color],
  ];

  const formatDetail = (value: unknown) => {
    if (Array.isArray(value)) return value.length ? `${value.length} item(s)` : 'None';
    if (typeof value === 'string' && value.includes('T')) return new Date(value).toLocaleDateString('fr-FR');
    return value == null ? 'Unknown' : String(value);
  };

  const isFavorite = favorites.some((favorite) => favorite.uid === character.uid);

  const toggleFavorite = () => {
    const nextFavorites = isFavorite
      ? favorites.filter((favorite) => favorite.uid !== character.uid)
      : [...favorites, { uid: character.uid, name: character.name }];

    setFavorites(nextFavorites);
    saveFavorites(nextFavorites);
  };

  return (
    <main className="character-detail-page">
      <Link className="detail-back-link" to="/characters">← All characters</Link>

      <section className="character-info-card" aria-labelledby="profile-heading">
        <div className="character-card-visual">
          <span className="character-card-code">SW / {character.uid}</span>
          <span className="character-card-badge">SWAPI Profile</span>
        </div>

        <div className="character-card-body">
          <button
            type="button"
            className="selection-dot detail-selection-dot"
            aria-label={isFavorite
              ? `Remove ${character.name} from my selection`
              : `Add ${character.name} to my selection`}
            aria-pressed={isFavorite}
            onClick={toggleFavorite}
          >
            <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
          </button>
          <span className="detail-kicker">Galactic archives</span>
          <h1 id="profile-heading">{character.name}</h1>
          <p>{character.description}</p>

          <dl className="detail-list">
            {details.map(([label, value, unit]) => (
              <div className="detail-list-item" key={label}>
                <dt>{label}</dt>
                <dd>{formatDetail(value)}{unit && value ? ` ${unit}` : ''}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
