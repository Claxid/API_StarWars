export interface FavoriteCharacter {
  uid: string;
  name: string;
}

const FAVORITES_STORAGE_KEY = 'star-wars-selection';

export function getFavorites(): FavoriteCharacter[] {
  try {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!storedFavorites) return [];

    const favorites: unknown = JSON.parse(storedFavorites);
    if (!Array.isArray(favorites)) return [];

    return favorites.filter(
      (favorite): favorite is FavoriteCharacter =>
        typeof favorite?.uid === 'string' && typeof favorite?.name === 'string',
    );
  } catch {
    return [];
  }
}

export function saveFavorites(favorites: FavoriteCharacter[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
}
