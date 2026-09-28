# Star Wars Explorer

Application React et TypeScript pour parcourir les personnages de Star Wars avec les donnees de SWAPI.tech.

## Equipe et API

- Membres du binome : Chloe (`chloehumbert`) et Clement (`Claxid`). A confirmer avec les noms complets avant le rendu.
- API : [SWAPI.tech](https://www.swapi.tech/), endpoint `https://www.swapi.tech/api/people`.
- Application deployee : URL a renseigner. Aucune URL de deploiement n'est presente dans le depot.

## Installation et lancement

Prerequis : Node.js, npm et une connexion Internet pour acceder a SWAPI.tech.

Depuis la racine du depot :

```sh
cd StarWars
npm install
npm run dev
```

Vite affiche l'adresse locale a ouvrir dans le navigateur.

Commandes disponibles depuis `StarWars/` :

| Commande | Description |
| --- | --- |
| `npm run dev` | Demarre le serveur de developpement. |
| `npm run build` | Verifie TypeScript et produit la version de production dans `dist/`. |
| `npm run preview` | Lance un apercu local de la version de production. |
| `npm run lint` | Lance ESLint. |
| `npm test` | Execute les tests automatises une fois. |

## Fonctionnalites

- Parcourir les personnages recuperes depuis SWAPI.tech.
- Rechercher par nom et filtrer par faction.
- Ouvrir la fiche detaillee d'un personnage : taille, masse, genre, annee de naissance et couleurs.
- Ajouter ou retirer des personnages de la selection. Les favoris sont sauvegardes dans le `localStorage` du navigateur.
- Creer des fiches de personnages personnalisees. Elles sont conservees en memoire pendant la session et disparaissent au rechargement.

| URL | Contenu |
| --- | --- |
| `/` et `/home` | Accueil. |
| `/characters` | Liste, recherche et filtres. |
| `/characters/:id` | Fiche detaillee SWAPI.tech. |
| `/selection` | Favoris sauvegardes dans le navigateur. |
| `/add-character` | Formulaire de creation d'une fiche temporaire. |

## Optimisation et mesure

Le catalogue charge la premiere page pour connaitre le nombre total de pages, puis recupere les pages restantes en parallele avec `Promise.all`, au lieu d'attendre chaque reponse l'une apres l'autre.

Mesure ponctuelle du 28 septembre 2026 sur le meme jeu de donnees (7 pages, 82 personnages), avec Node.js 22.19 et l'API en ligne :

| Strategie | Essais | Duree moyenne |
| --- | --- | --- |
| Avant : requetes sequentielles | 2,46 s et 7,27 s | 4,87 s |
| Apres : pages chargees en parallele | 1,15 s et 2,23 s | 1,69 s |

La moyenne mesuree est environ 65 % plus basse apres l'optimisation. Le reseau et le temps de reponse de l'API varient fortement : ce releve est indicatif, pas un benchmark reproductible en CI.

## Tests

Les 8 tests automatises portent sur l'utilitaire de stockage des favoris :

1. Aucun favori enregistre.
2. Lecture d'une liste valide.
3. JSON invalide.
4. JSON valide qui n'est pas un tableau.
5. Entree sans identifiant texte.
6. Entree sans nom texte.
7. Sauvegarde JSON sous la cle attendue et relecture.
8. Erreur de lecture du stockage local.

`npm test` passe (8/8) et `npm run build` passe. Ne sont pas encore testes : les composants et interactions React, les routes, le formulaire, les appels reels a SWAPI.tech et les parcours de bout en bout. `npm run lint` signale actuellement une erreur `react-hooks/set-state-in-effect` dans `src/pages/CharacterDetail.tsx`.

## Avec une semaine de plus

- Ajouter des tests d'integration pour la recherche, les filtres, les favoris, les routes et le formulaire.
- Persister les personnages personnalises au rechargement.
- Ajouter des retours d'erreur et une option de nouvelle tentative pour les appels API.
- Deployer l'application et renseigner son URL publique ici.

## Journal de decisions

Decision : les pages de l'API sont chargees en parallele.
Pourquoi : reduire l'attente totale pour afficher le catalogue complet.
Alternative ecartee : attendre chaque page sequentiellement.

Decision : recherche et filtres s'appliquent aux donnees deja chargees.
Pourquoi : le resultat s'actualise sans nouvel appel API a chaque frappe.
Alternative ecartee : interroger l'API a chaque changement de filtre.

Decision : les favoris sont conserves dans `localStorage`.
Pourquoi : ils restent disponibles apres rechargement sans serveur ni compte.
Alternative ecartee : les garder uniquement dans l'etat React.

Decision : un favori stocke uniquement son identifiant et son nom.
Pourquoi : ces champs suffisent pour la liste de selection et limitent les donnees dupliquees.
Alternative ecartee : copier toute la fiche API dans le stockage.

Decision : les vues utilisent des routes distinctes avec React Router.
Pourquoi : chaque page a une URL directe et partageable.
Alternative ecartee : basculer les vues avec un etat local unique.

Decision : les personnages crees par l'utilisateur restent temporaires.
Pourquoi : le projet ne dispose pas de serveur de persistance.
Alternative ecartee : simuler une sauvegarde permanente sans backend.
