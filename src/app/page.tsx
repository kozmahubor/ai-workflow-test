import { GpuComparisonDashboard } from '../components/GpuComparisonDashboard';
import { MockGpuPriceProvider } from '../services/gpu-service';

export default async function HomePage() {
  const provider = new MockGpuPriceProvider();
  const offers = await provider.getOffers();
  const summary = offers.length > 0 ? await provider.getSummary() : null;

  return (
    <main className="site-shell">
      <nav aria-label="Fő navigáció" className="topbar">
        <a className="brand" href="#offers">
          <span aria-hidden="true" className="brand-mark">
            RX
          </span>
          <span className="brand-text">GPU árfigyelő</span>
        </a>
      </nav>

      <header className="page-heading">
        <p className="eyebrow">Gyorsabb döntés, jobb ár</p>
        <h1>Radeon RX 9070 XT ár-összehasonlító</h1>
        <p className="intro-copy">
          Nézd meg a hazai üzletek ajánlatait egy átlátható nézetben, és találd meg a számodra
          legjobb Radeon RX 9070 XT vételt.
        </p>
        <p className="results-count">{offers.length} friss ajánlat több üzletből</p>
      </header>

      <div id="offers">
        <GpuComparisonDashboard initialOffers={offers} initialSummary={summary} />
      </div>
    </main>
  );
}
