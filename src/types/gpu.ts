export type StoreName = 'Arukereso' | 'Alza' | 'eMAG' | 'HardverApro';

export interface GpuOffer {
  id: string;
  model: string;
  store: StoreName;
  priceHuf: number;
  inStock: boolean;
  url: string;
  warrantyMonths: number;
  updatedAt: string;
}

export interface GpuFilter {
  minPrice?: number;
  maxPrice?: number;
  stores?: StoreName[];
  inStockOnly?: boolean;
}

export interface GpuPriceSummary {
  lowestPrice: number;
  highestPrice: number;
  averagePrice: number;
  bestDeal: GpuOffer;
}

export interface IGpuPriceProvider {
  getOffers(filter?: GpuFilter): Promise<GpuOffer[]>;
  getSummary(): Promise<GpuPriceSummary>;
}
