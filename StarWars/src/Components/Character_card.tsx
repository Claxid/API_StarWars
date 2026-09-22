import { useState, useEffect } from 'react';

interface Person {
  uid: string;
  name: string;
}

interface PeopleResponse {
  results: Person[];
  total_pages: number;
}

function PeopleList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      setError(null);
      try {
        const firstResponse = await fetch('https://www.swapi.tech/api/people?page=1&limit=12');
        if (!firstResponse.ok) throw new Error('Erreur réseau');

        const firstPage: PeopleResponse = await firstResponse.json();
        const remainingPages = Array.from(
          { length: firstPage.total_pages - 1 },
          (_, index) => index + 2,
        );
        const pages = await Promise.all(
          remainingPages.map(async (page) => {
            const response = await fetch(`https://www.swapi.tech/api/people?page=${page}&limit=12`);
            if (!response.ok) throw new Error('Erreur réseau');
            return response.json() as Promise<PeopleResponse>;
          }),
        );

        setPeople([firstPage, ...pages].flatMap((page) => page.results));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="characters-page">
      <header className="characters-header">
        <p className="eyebrow">Base de données galactique</p>
        <h1>Personnages Star Wars</h1>
        <p>{people.length} personnages trouvés dans l'API.</p>
      </header>

      <ul className="characters-grid">
        {people.map((person) => (
          <li className="character-card" key={person.uid}>
            <span className="character-number">{person.uid}</span>
            <h2>{person.name}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default PeopleList;