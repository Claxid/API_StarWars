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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.swapi.tech/api/people?page=${page}&limit=12`);
        if (!res.ok) throw new Error('Erreur réseau');
        const json: PeopleResponse = await res.json();
        setPeople(json.results);
        setTotalPages(json.total_pages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [page]); // re-fetch à chaque changement de page

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Personnages Star Wars</h1>

      <ul>
        {people.map((person) => (
          <li key={person.uid}>{person.name}</li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Précédent
        </button>

        <span> Page {page} / {totalPages} </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default PeopleList;