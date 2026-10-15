import type { GpuOffer, StoreName } from '../types/gpu';

interface GpuCardProps {
  offer: GpuOffer;
}

const storeDetails: Record<StoreName, { label: string; badgeClass: string }> = {
  Arukereso: { label: 'Árukereső', badgeClass: 'store-badge--arukereso' },
  Alza: { label: 'Alza', badgeClass: 'store-badge--alza' },
  eMAG: { label: 'eMAG', badgeClass: 'store-badge--emag' },
  HardverApro: { label: 'HardverApró', badgeClass: 'store-badge--hardverapro' },
};

const hufFormatter = new Intl.NumberFormat('hu-HU', {
  currency: 'HUF',
  maximumFractionDigits: 0,
  style: 'currency',
});

export function GpuCard({ offer }: GpuCardProps) {
  const store = storeDetails[offer.store];
  const availabilityLabel = offer.inStock ? 'Raktáron' : 'Jelenleg nincs készleten';

  return (
    <article className={`offer-card${offer.inStock ? '' : ' unavailable'}`}>
      <div className="offer-card-header">
        <h2 className="offer-model">{offer.model}</h2>
        <span className={`store-badge ${store.badgeClass}`}>{store.label}</span>
      </div>

      <div className="offer-price-row">
        <p className="offer-price">{hufFormatter.format(offer.priceHuf)}</p>
        <p className={`stock-status${offer.inStock ? ' in-stock' : ' out-of-stock'}`}>
          {availabilityLabel}
        </p>
      </div>

      <div className="offer-meta-row">
        <p className="warranty">{offer.warrantyMonths} hónap garancia</p>
        <a
          aria-disabled={!offer.inStock}
          className="purchase-link"
          href={offer.url}
          rel="noreferrer"
          target="_blank"
          title={offer.inStock ? undefined : 'Ez az ajánlat jelenleg nem elérhető készletről'}
          onClick={(event) => {
            if (!offer.inStock) {
              event.preventDefault();
            }
          }}
        >
          Ajánlat megtekintése
        </a>
      </div>
    </article>
  );
}
