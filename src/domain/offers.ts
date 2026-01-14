export interface Offer {
  code: string;
  apply: (items: string[], catalog: Map<string, number>) => number;
}

export const redWidgetOffer: Offer = {
  code: "R01_HALF",
  apply(items, catalog) {
    const r01Count = items.filter((c) => c === "R01").length;
    const discounted = Math.floor(r01Count / 2);
    const unitPrice = catalog.get("R01") ?? 0;
    return Math.round(discounted * unitPrice * 0.5);
  },
};

export const defaultOffers: Offer[] = [redWidgetOffer];
