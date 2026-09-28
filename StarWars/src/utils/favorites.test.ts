import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getFavorites, saveFavorites, type FavoriteCharacter } from './favorites';

const storageKey = 'star-wars-selection';

describe('favorite storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns an empty list when no favorites are stored', () => {
    expect(getFavorites()).toEqual([]);
  });

  it('loads valid favorites from local storage', () => {
    const favorites: FavoriteCharacter[] = [{ uid: '1', name: 'Luke Skywalker' }];
    localStorage.setItem(storageKey, JSON.stringify(favorites));

    expect(getFavorites()).toEqual(favorites);
  });

  it('returns an empty list when stored JSON is invalid', () => {
    localStorage.setItem(storageKey, '{invalid json');

    expect(getFavorites()).toEqual([]);
  });

  it('returns an empty list when stored JSON is not an array', () => {
    localStorage.setItem(storageKey, JSON.stringify({ uid: '1', name: 'Luke Skywalker' }));

    expect(getFavorites()).toEqual([]);
  });

  it('ignores entries without a string uid', () => {
    localStorage.setItem(storageKey, JSON.stringify([{ name: 'Luke Skywalker' }]));

    expect(getFavorites()).toEqual([]);
  });

  it('ignores entries without a string name', () => {
    localStorage.setItem(storageKey, JSON.stringify([{ uid: '1' }]));

    expect(getFavorites()).toEqual([]);
  });

  it('saves favorites as JSON under the expected key', () => {
    const favorites: FavoriteCharacter[] = [{ uid: '1', name: 'Luke Skywalker' }];

    saveFavorites(favorites);

    expect(localStorage.getItem(storageKey)).toBe(JSON.stringify(favorites));
    expect(getFavorites()).toEqual(favorites);
  });

  it('returns an empty list when local storage throws an error', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage unavailable');
    });

    expect(getFavorites()).toEqual([]);
  });
});