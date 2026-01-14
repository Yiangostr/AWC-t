export interface Product {
  code: string;
  name: string;
  priceCents: number;
}

export const defaultCatalog: Product[] = [
  { code: "R01", name: "Red Widget", priceCents: 3295 },
  { code: "G01", name: "Green Widget", priceCents: 2495 },
  { code: "B01", name: "Blue Widget", priceCents: 795 },
];
