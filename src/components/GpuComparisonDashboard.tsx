'use client';

import { useMemo, useState } from 'react';
import type { GpuOffer, GpuPriceSummary } from '../types/gpu';
import { useFavoritesAndAlerts } from '../hooks/useFavoritesAndAlerts';
import { AlertBanner } from './AlertBanner';
import { GpuCard } from './GpuCard';
import { GpuFilterBar, storeOptions, type PriceRange } from './GpuFilterBar';
import { PriceAlertModal } from './PriceAlertModal';
import { PriceSummaryBanner } from './PriceSummaryBanner';
import { ThemeToggle } from './ThemeToggle';

interface GpuComparisonDashboardProps {
  initialOffers: readonly GpuOffer[];
  initialSummary: GpuPriceSummary | null;
}

const getPriceBounds = (offers: readonly GpuOffer[]): PriceRange => {
  if (offers.length === 0) {
    return { minPrice: 0, maxPrice: 0 };
  }

  const prices = offers.map((offer) => offer.priceHuf);
  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
};

const summarizeOffers = (offers: readonly GpuOffer[]): GpuPriceSummary | null => {
  if (offers.length === 0) {
    return null;
  }

  const lowestPrice = Math.min(...offers.map((offer) => offer.priceHuf));
  const highestPrice = Math.max(...offers.map((offer) => offer.priceHuf));
  const totalPrice = offers.reduce((total, offer) => total + offer.priceHuf, 0);
  const bestDeal = offers.reduce((best, offer) =>
    offer.priceHuf < best.priceHuf ? offer : best,
  );

  return {
    lowestPrice,
    highestPrice,
    averagePrice: totalPrice / offers.length,
    bestDeal,
  };
};

export function GpuComparisonDashboard({
  initialOffers,
  initialSummary,
}: GpuComparisonDashboardProps) {
  const priceBounds = useMemo(() => getPriceBounds(initialOffers), [initialOffers]);
  const {
    favoriteStores,
    targetPrice,
    isSubscribed,
    updateFavoriteStores,
    saveAlert,
    disableAlert,
  } = useFavoritesAndAlerts();
  const [minPrice, setMinPrice] = useState(priceBounds.minPrice);
  const [maxPrice, setMaxPrice] = useState(priceBounds.maxPrice);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const filteredOffers = useMemo(
    () =>
      initialOffers.filter(
        (offer) =>
          favoriteStores.includes(offer.store) &&
          offer.priceHuf >= minPrice &&
          offer.priceHuf <= maxPrice &&
          (!inStockOnly || offer.inStock),
      ),
    [favoriteStores, initialOffers, inStockOnly, maxPrice, minPrice],
  );

  const filteredSummary = useMemo(() => summarizeOffers(filteredOffers), [filteredOffers]);
  const isInitialView =
    !inStockOnly &&
    minPrice === priceBounds.minPrice &&
    maxPrice === priceBounds.maxPrice &&
    favoriteStores.length === storeOptions.length;
  const visibleSummary = isInitialView ? initialSummary ?? filteredSummary : filteredSummary;

  const handlePriceRangeChange = (range: PriceRange) => {
    setMinPrice(range.minPrice);
    setMaxPrice(range.maxPrice);
  };

  const handleReset = () => {
    updateFavoriteStores([...storeOptions]);
    setMinPrice(priceBounds.minPrice);
    setMaxPrice(priceBounds.maxPrice);
    setInStockOnly(false);
  };

  return (
    <section aria-label="GPU ajánlatok" className="dashboard">
      <div className="dashboard-toolbar">
        <p aria-live="polite">
          {filteredOffers.length} ajánlat látható a {initialOffers.length} összes ajánlatból
        </p>
        <div className="toolbar-actions">
          <button className="alert-button" type="button" onClick={() => setIsAlertModalOpen(true)}>
            {targetPrice === null ? 'Célár beállítása' : 'Célár módosítása'}
          </button>
          <ThemeToggle />
        </div>
      </div>

      <AlertBanner
        isSubscribed={isSubscribed}
        offers={initialOffers}
        onDisable={disableAlert}
        onEdit={() => setIsAlertModalOpen(true)}
        targetPrice={targetPrice}
      />

      <GpuFilterBar
        inStockOnly={inStockOnly}
        maxPrice={maxPrice}
        minPrice={minPrice}
        onInStockOnlyChange={setInStockOnly}
        onPriceRangeChange={handlePriceRangeChange}
        onReset={handleReset}
        onStoresChange={updateFavoriteStores}
        priceBounds={priceBounds}
        selectedStores={favoriteStores}
      />

      <PriceSummaryBanner summary={visibleSummary} visibleOfferCount={filteredOffers.length} />

      {filteredOffers.length > 0 ? (
        <div className="offer-grid">
          {filteredOffers.map((offer) => (
            <GpuCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nincs ilyen feltételeknek megfelelő ajánlat</h2>
          <p>Állíts vissza egy szűrőt, vagy válassz szélesebb ártartományt.</p>
        </div>
      )}

      <PriceAlertModal
        open={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onSave={saveAlert}
        targetPrice={targetPrice}
      />
    </section>
  );
}
