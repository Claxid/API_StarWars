import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CharacterDetailData {
  uid: string;
  name: string;
  description: string;
  properties?: {
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

  useEffect(() => {
    if (!id) {
      setError('Aucun personnage sélectionné.');
      setLoading(false);
      return;
    }

    const fetchCharacter = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
        if (!response.ok) {
          throw new Error('Personnage introuvable');
        }

        const data: CharacterApiResponse = await response.json();
        const result = data.result;

        if (!result) {
          throw new Error('Aucune donnée reçue pour ce personnage');
        }

        setCharacter({
          uid: result.uid ?? id,
          name: result.name ?? 'Personnage inconnu',
          description: result.description ?? 'Aucune description disponible.',
          properties: result.properties ?? {},
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <p>Chargement du personnage...</p>;
  if (error) return <p>Erreur : {error}</p>;
  if (!character) return <p>Personnage introuvable.</p>;

  return (
    <main className="character-detail-page">
      <h2>{character.name}</h2>
      <p>{character.description}</p>

      <ul>
        <li>Genre : {character.properties?.gender ?? 'Inconnu'}</li>
        <li>Taille : {character.properties?.height ?? 'Inconnu'}</li>
        <li>Poids : {character.properties?.mass ?? 'Inconnu'}</li>
        <li>Année de naissance : {character.properties?.birth_year ?? 'Inconnu'}</li>
        <li>Couleur des yeux : {character.properties?.eye_color ?? 'Inconnu'}</li>
        <li>Couleur des cheveux : {character.properties?.hair_color ?? 'Inconnu'}</li>
        <li>Couleur de peau : {character.properties?.skin_color ?? 'Inconnu'}</li>
      </ul>
    </main>
  );
}
