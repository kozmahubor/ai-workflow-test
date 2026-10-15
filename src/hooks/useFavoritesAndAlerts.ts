'use client';

import { useEffect, useState } from 'react';
import { storeOptions } from '../components/GpuFilterBar';
import type { StoreName } from '../types/gpu';

const PREFERENCES_STORAGE_KEY = 'gpu-comparison-preferences';

interface StoredPreferences {
  favoriteStores?: unknown;
  targetPrice?: unknown;
  isSubscribed?: unknown;
}

export interface FavoritesAndAlerts {
  favoriteStores: StoreName[];
  targetPrice: number | null;
  isSubscribed: boolean;
  updateFavoriteStores: (stores: StoreName[]) => void;
  saveAlert: (targetPrice: number) => void;
  disableAlert: () => void;
}

const defaultFavoriteStores = (): StoreName[] => [...storeOptions];

const isStoreName = (value: unknown): value is StoreName =>
  typeof value === 'string' && storeOptions.includes(value as StoreName);

const readFavoriteStores = (value: unknown): StoreName[] => {
  if (!Array.isArray(value)) {
    return defaultFavoriteStores();
  }

  const validStores = [...new Set(value.filter(isStoreName))];
  return value.length > 0 && validStores.length === 0 ? defaultFavoriteStores() : validStores;
};

const readTargetPrice = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;

export function useFavoritesAndAlerts(): FavoritesAndAlerts {
  const [favoriteStores, setFavoriteStores] = useState<StoreName[]>(defaultFavoriteStores);
  const [targetPrice, setTargetPrice] = useState<number | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedValue = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);

      if (storedValue) {
        const storedPreferences: unknown = JSON.parse(storedValue);

        if (storedPreferences && typeof storedPreferences === 'object') {
          const preferences = storedPreferences as StoredPreferences;
          setFavoriteStores(readFavoriteStores(preferences.favoriteStores));
          setTargetPrice(readTargetPrice(preferences.targetPrice));
          setIsSubscribed(preferences.isSubscribed === true);
        }
      }
    } catch {
      // Invalid or inaccessible LocalStorage values leave the defaults in place.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(
        PREFERENCES_STORAGE_KEY,
        JSON.stringify({ favoriteStores, targetPrice, isSubscribed }),
      );
    } catch {
      // LocalStorage can be unavailable in privacy-restricted browser contexts.
    }
  }, [favoriteStores, isHydrated, isSubscribed, targetPrice]);

  const updateFavoriteStores = (stores: StoreName[]) => {
    setFavoriteStores([...new Set(stores.filter(isStoreName))]);
  };

  const saveAlert = (nextTargetPrice: number) => {
    if (!Number.isFinite(nextTargetPrice) || nextTargetPrice <= 0) {
      return;
    }

    setTargetPrice(nextTargetPrice);
    setIsSubscribed(true);
  };

  const disableAlert = () => {
    setIsSubscribed(false);
  };

  return {
    favoriteStores,
    targetPrice,
    isSubscribed,
    updateFavoriteStores,
    saveAlert,
    disableAlert,
  };
}
