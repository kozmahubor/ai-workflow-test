import { mockGpuOffers } from '../data/mock-gpu-offers';
import type {
  GpuFilter,
  GpuOffer,
  GpuPriceSummary,
  IGpuPriceProvider,
} from '../types/gpu';

const copyOffer = (offer: GpuOffer): GpuOffer => ({ ...offer });

export class MockGpuPriceProvider implements IGpuPriceProvider {
  private readonly offers: GpuOffer[];

  constructor(offers: readonly GpuOffer[] = mockGpuOffers) {
    this.offers = offers.map(copyOffer);
  }

  async getOffers(filter?: GpuFilter): Promise<GpuOffer[]> {
    const filteredOffers = this.offers.filter((offer) => {
      if (filter?.minPrice !== undefined && offer.priceHuf < filter.minPrice) {
        return false;
      }

      if (filter?.maxPrice !== undefined && offer.priceHuf > filter.maxPrice) {
        return false;
      }

      if (filter?.stores !== undefined && !filter.stores.includes(offer.store)) {
        return false;
      }

      if (filter?.inStockOnly === true && !offer.inStock) {
        return false;
      }

      return true;
    });

    return filteredOffers.map(copyOffer);
  }

  async getSummary(): Promise<GpuPriceSummary> {
    if (this.offers.length === 0) {
      throw new Error('Cannot calculate a GPU price summary without offers.');
    }

    const lowestPrice = Math.min(...this.offers.map((offer) => offer.priceHuf));
    const highestPrice = Math.max(...this.offers.map((offer) => offer.priceHuf));
    const totalPrice = this.offers.reduce((total, offer) => total + offer.priceHuf, 0);
    const bestDeal = this.offers.reduce((best, offer) =>
      offer.priceHuf < best.priceHuf ? offer : best,
    );

    return {
      lowestPrice,
      highestPrice,
      averagePrice: totalPrice / this.offers.length,
      bestDeal: copyOffer(bestDeal),
    };
  }
}
