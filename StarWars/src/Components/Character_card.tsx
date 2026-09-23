import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Person {
  uid: string;
  name: string;
}

type FactionFilter = 'all' | 'jedi' | 'empire' | 'hunter';

interface PeopleResponse {
  results: Person[];
  total_pages: number;
}

function PeopleList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [factionFilter, setFactionFilter] = useState<FactionFilter>('all');

  const getFaction = (name: string): FactionFilter => {
    const normalizedName = name.toLowerCase();

    const jediNames = [
      'luke skywalker',
      'obi-wan kenobi',
      'yoda',
      'anakin skywalker',
      'qui-gon jinn',
      'mace windu',
      'aayla secura',
      'shaak ti',
      'ahsoka tano',
      'kit fisto',
      'ezra bridger',
      'rey',
      'leia organa',
      'padmé amidala',
    ];

    const empireNames = [
      'darth vader',
      'emperor palpatine',
      'darth maul',
      'grand moff tarkin',
      'stormtrooper',
      'vader',
      'gregor',
      'kallus',
    ];

    const hunterNames = ['boba fett', 'jango fett'];

    if (jediNames.includes(normalizedName)) return 'jedi';
    if (empireNames.includes(normalizedName)) return 'empire';
    if (hunterNames.includes(normalizedName)) return 'hunter';
    return 'all';
  };

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

  const filteredPeople = people.filter((person) => {
    const matchSearch = person.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchFaction = factionFilter === 'all' || getFaction(person.name) === factionFilter;
    return matchSearch && matchFaction;
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <main className="characters-page">
      <header className="characters-header">
        <p className="eyebrow">Base de données galactique</p>
        <h2>Personnages Star Wars</h2>
        <p>{filteredPeople.length} personnages trouvés dans l'API.</p>
      </header>

      <div className="filters-row">
        <div className="search-bar-wrap">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un personnage..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Rechercher un personnage"
          />
        </div>

        <div className="filter-wrap">
          <label htmlFor="faction-filter" className="filter-label">Faction</label>
          <select
            id="faction-filter"
            className="filter-select"
            value={factionFilter}
            onChange={(event) => setFactionFilter(event.target.value as FactionFilter)}
          >
            <option value="all">Tous</option>
            <option value="jedi">Jedi</option>
            <option value="empire">Empire</option>
            <option value="hunter">Chasseur de prime</option>
          </select>
        </div>
      </div>

      {filteredPeople.length === 0 ? (
        <p className="no-result">Aucun personnage trouvé pour "{search}" avec ce filtre.</p>
      ) : (
        <ul className="characters-grid">
          {filteredPeople.map((person) => (
            <li className="character-card" key={person.uid}>
              <div className="character-card-content">
                <span className="character-number">{person.uid}</span>
                <h2>{person.name}</h2>
                <span className="character-gender">{getFaction(person.name)}</span>
              </div>

              <Link to={`/characters/${person.uid}`} className="character-detail-button">
                Détail
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default PeopleList;