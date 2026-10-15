import type { GpuOffer } from '../types/gpu';

export const mockGpuOffers: GpuOffer[] = [
  {
    id: 'rx-9070-xt-arukereso',
    model: 'Radeon RX 9070 XT',
    store: 'Arukereso',
    priceHuf: 289990,
    inStock: true,
    url: 'https://www.arukereso.hu/videokartya-c3142/radeon-rx-9070-xt-p123456789/',
    warrantyMonths: 36,
    updatedAt: '2026-10-14T08:00:00.000Z',
  },
  {
    id: 'rx-9070-xt-alza',
    model: 'Radeon RX 9070 XT',
    store: 'Alza',
    priceHuf: 294990,
    inStock: true,
    url: 'https://www.alza.hu/gaming/radeon-rx-9070-xt-d12345678.htm',
    warrantyMonths: 24,
    updatedAt: '2026-10-14T08:15:00.000Z',
  },
  {
    id: 'rx-9070-xt-emag',
    model: 'Radeon RX 9070 XT',
    store: 'eMAG',
    priceHuf: 301990,
    inStock: false,
    url: 'https://www.emag.hu/videokartya/radeon-rx-9070-xt/pd/D123456BM/',
    warrantyMonths: 24,
    updatedAt: '2026-10-14T08:30:00.000Z',
  },
  {
    id: 'rx-9070-xt-hardverapro',
    model: 'Radeon RX 9070 XT',
    store: 'HardverApro',
    priceHuf: 279990,
    inStock: true,
    url: 'https://hardverapro.hu/apro/radeon_rx_9070_xt_123456.html',
    warrantyMonths: 12,
    updatedAt: '2026-10-14T08:45:00.000Z',
  },
];
