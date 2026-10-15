import type { GpuPriceSummary } from '../types/gpu';

interface PriceSummaryBannerProps {
  summary: GpuPriceSummary | null;
  visibleOfferCount: number;
}

const hufFormatter = new Intl.NumberFormat('hu-HU', {
  currency: 'HUF',
  maximumFractionDigits: 0,
  style: 'currency',
});

export function PriceSummaryBanner({ summary, visibleOfferCount }: PriceSummaryBannerProps) {
  if (!summary || visibleOfferCount === 0) {
    return (
      <section aria-live="polite" className="summary-banner" aria-label="Árösszesítő">
        <div>
          <h2 className="summary-heading">Nincs megjeleníthető ajánlat</h2>
          <p className="summary-subtitle">Próbáld meg tágítani a szűrési feltételeket.</p>
        </div>
        <p className="no-results">A jelenlegi szűrők egyetlen ajánlatot sem találtak.</p>
      </section>
    );
  }

  const priceSpread = summary.highestPrice - summary.lowestPrice;

  return (
    <section aria-live="polite" className="summary-banner" aria-label="Árösszesítő">
      <div>
        <h2 className="summary-heading">A kiválasztott ajánlatok összesítése</h2>
        <p className="summary-subtitle">{visibleOfferCount} elérhető ajánlat alapján</p>
      </div>
      <dl className="summary-items">
        <div className="summary-item best-deal">
          <dt>Legjobb ajánlat</dt>
          <dd>{hufFormatter.format(summary.bestDeal.priceHuf)}</dd>
        </div>
        <div className="summary-item">
          <dt>Átlagár</dt>
          <dd>{hufFormatter.format(summary.averagePrice)}</dd>
        </div>
        <div className="summary-item">
          <dt>Árkülönbség</dt>
          <dd>{hufFormatter.format(priceSpread)}</dd>
        </div>
      </dl>
    </section>
  );
}
