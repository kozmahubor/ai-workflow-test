'use client';

import type { GpuOffer, StoreName } from '../types/gpu';

interface AlertBannerProps {
  offers: readonly GpuOffer[];
  targetPrice: number | null;
  isSubscribed: boolean;
  onEdit: () => void;
  onDisable: () => void;
}

const storeLabels: Record<StoreName, string> = {
  Arukereso: 'Árukereső',
  Alza: 'Alza',
  eMAG: 'eMAG',
  HardverApro: 'HardverApró',
};

const hufFormatter = new Intl.NumberFormat('hu-HU');

export function AlertBanner({
  offers,
  targetPrice,
  isSubscribed,
  onEdit,
  onDisable,
}: AlertBannerProps) {
  if (!isSubscribed || targetPrice === null || !Number.isFinite(targetPrice) || targetPrice <= 0) {
    return null;
  }

  const lowestOffer = offers.reduce<GpuOffer | null>(
    (lowest, offer) => (lowest === null || offer.priceHuf < lowest.priceHuf ? offer : lowest),
    null,
  );

  if (lowestOffer === null || lowestOffer.priceHuf > targetPrice) {
    return null;
  }

  return (
    <aside aria-live="polite" className="alert-banner">
      <p className="alert-banner-message">
        <span className="alert-banner-title">Célár elérve!</span>{' '}
        A legolcsóbb ajánlat most {hufFormatter.format(lowestOffer.priceHuf)} Ft a{' '}
        {storeLabels[lowestOffer.store]} kínálatában.
      </p>
      <div className="alert-banner-actions">
        <button className="alert-action-button" type="button" onClick={onEdit}>
          Célár módosítása
        </button>
        <button
          className="alert-action-button alert-action-button--quiet"
          type="button"
          onClick={onDisable}
        >
          Értesítés kikapcsolása
        </button>
      </div>
    </aside>
  );
}
