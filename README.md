# Star Wars Explorer

Application web React permettant d'explorer les personnages de Star Wars à partir de l'API SWAPI.tech.

## Fonctionnalités

- Parcourir les personnages récupérés depuis l'API.
- Rechercher un personnage par son nom et filtrer la liste par faction.
- Consulter la fiche d'un personnage et ses caractéristiques (taille, masse, genre, année de naissance et couleurs).
- Ajouter ou retirer des personnages de sa sélection. Les favoris sont conservés dans le stockage local du navigateur.
- Créer des fiches de personnages personnalisées pendant la session en cours.

Les personnages personnalisés sont conservés uniquement en mémoire : ils disparaissent lorsque l'application est rechargée. Les favoris, eux, restent enregistrés dans le navigateur.

## Technologies

- React 19 et TypeScript
- Vite
- React Router
- [SWAPI.tech](https://www.swapi.tech/) pour les données des personnages

## Prérequis

- Node.js et npm
- Une connexion Internet pour charger les personnages depuis SWAPI.tech

## Installation et lancement

Depuis la racine du dépôt :

```sh
cd StarWars
npm install
npm run dev
```

Vite affiche l'adresse locale à ouvrir dans le navigateur après le démarrage.

## Commandes disponibles

À exécuter depuis le dossier `StarWars/` :

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarre le serveur de développement Vite. |
| `npm run build` | Vérifie les types TypeScript et crée la version de production dans `dist/`. |
| `npm run preview` | Sert localement la version de production. |
| `npm run lint` | Lance ESLint sur le projet. |

## Pages de l'application

| URL | Contenu |
| --- | --- |
| `/` et `/home` | Page d'accueil. |
| `/characters` | Liste, recherche et filtres des personnages. |
| `/characters/:id` | Fiche détaillée d'un personnage de SWAPI.tech. |
| `/selection` | Liste des personnages favoris enregistrés dans le navigateur. |
| `/add-character` | Formulaire de création d'une fiche personnalisée temporaire. |

## Données et stockage

Les personnages et leurs fiches sont chargés depuis `https://www.swapi.tech/api/people`. Aucun compte ni clé d'API n'est nécessaire. La sélection des favoris est stockée dans le `localStorage` du navigateur sous la clé `star-wars-selection`.
