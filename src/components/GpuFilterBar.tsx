'use client';

import type { ChangeEvent } from 'react';
import type { StoreName } from '../types/gpu';

export const storeOptions: readonly StoreName[] = [
  'Arukereso',
  'Alza',
  'eMAG',
  'HardverApro',
];

const storeLabels: Record<StoreName, string> = {
  Arukereso: 'Árukereső',
  Alza: 'Alza',
  eMAG: 'eMAG',
  HardverApro: 'HardverApró',
};

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
}

interface GpuFilterBarProps {
  priceBounds: PriceRange;
  minPrice: number;
  maxPrice: number;
  selectedStores: readonly StoreName[];
  inStockOnly: boolean;
  onPriceRangeChange: (range: PriceRange) => void;
  onStoresChange: (stores: StoreName[]) => void;
  onInStockOnlyChange: (inStockOnly: boolean) => void;
  onReset: () => void;
}

const getInputValue = (event: ChangeEvent<HTMLInputElement>): number => {
  const value = Number(event.currentTarget.value);
  return Number.isFinite(value) ? value : 0;
};

export function GpuFilterBar({
  priceBounds,
  minPrice,
  maxPrice,
  selectedStores,
  inStockOnly,
  onPriceRangeChange,
  onStoresChange,
  onInStockOnlyChange,
  onReset,
}: GpuFilterBarProps) {
  const handleMinPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMinPrice = Math.min(
      Math.max(getInputValue(event), priceBounds.minPrice),
      maxPrice,
    );
    onPriceRangeChange({ minPrice: nextMinPrice, maxPrice });
  };

  const handleMaxPriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextMaxPrice = Math.max(
      Math.min(getInputValue(event), priceBounds.maxPrice),
      minPrice,
    );
    onPriceRangeChange({ minPrice, maxPrice: nextMaxPrice });
  };

  const handleStoreChange = (store: StoreName, checked: boolean) => {
    const nextStores = checked
      ? [...selectedStores, store]
      : selectedStores.filter((selectedStore) => selectedStore !== store);

    onStoresChange(nextStores);
  };

  return (
    <form
      className="filter-bar"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <fieldset className="filter-group store-group">
        <legend>Üzletek</legend>
        <div className="store-options">
          {storeOptions.map((store) => (
            <label className="check-option" key={store}>
              <input
                checked={selectedStores.includes(store)}
                type="checkbox"
                onChange={(event) => handleStoreChange(store, event.currentTarget.checked)}
              />
              {storeLabels[store]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="filter-group">
        <legend>Ártartomány</legend>
        <div className="price-fields">
          <label className="price-input">
            Minimum
            <input
              aria-label="Minimum ár"
              max={priceBounds.maxPrice}
              min={priceBounds.minPrice}
              step="1"
              type="range"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <span>{new Intl.NumberFormat('hu-HU').format(minPrice)} Ft</span>
          </label>
          <label className="price-input">
            Maximum
            <input
              aria-label="Maximum ár"
              max={priceBounds.maxPrice}
              min={priceBounds.minPrice}
              step="1"
              type="range"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
            <span>{new Intl.NumberFormat('hu-HU').format(maxPrice)} Ft</span>
          </label>
        </div>
      </fieldset>

      <div className="filter-actions">
        <label className="check-option stock-option">
          <input
            checked={inStockOnly}
            type="checkbox"
            onChange={(event) => onInStockOnlyChange(event.currentTarget.checked)}
          />
          Csak raktáron
        </label>
        <button className="reset-button" type="button" onClick={onReset}>
          Szűrők törlése
        </button>
      </div>
    </form>
  );
}
