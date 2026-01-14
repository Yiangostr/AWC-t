import productsData from "../data/products.json";

export interface Product {
  code: string;
  name: string;
  description: string;
  priceCents: number;
  color: string;
}

export const defaultCatalog: Product[] = productsData.products;
