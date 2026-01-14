import type { Product } from "./catalog";
import type { DeliveryRule } from "./delivery";
import { calcDelivery } from "./delivery";
import type { Offer } from "./offers";

export class Basket {
  private items: string[] = [];
  private catalogMap: Map<string, number>;

  constructor(
    catalog: Product[],
    private deliveryRules: DeliveryRule[],
    private offers: Offer[]
  ) {
    this.catalogMap = new Map(catalog.map((p) => [p.code, p.priceCents]));
  }

  add(code: string): void {
    if (this.catalogMap.has(code)) {
      this.items.push(code);
    }
  }

  remove(code: string): void {
    const idx = this.items.indexOf(code);
    if (idx !== -1) this.items.splice(idx, 1);
  }

  clear(): void {
    this.items = [];
  }

  getItems(): string[] {
    return [...this.items];
  }

  getSubtotalCents(): number {
    return this.items.reduce(
      (sum, code) => sum + (this.catalogMap.get(code) ?? 0),
      0
    );
  }

  getDiscountCents(): number {
    return this.offers.reduce(
      (sum, offer) => sum + offer.apply(this.items, this.catalogMap),
      0
    );
  }

  getDeliveryCents(): number {
    const afterDiscount = this.getSubtotalCents() - this.getDiscountCents();
    return calcDelivery(afterDiscount, this.deliveryRules);
  }

  total(): string {
    const subtotal = this.getSubtotalCents();
    const discount = this.getDiscountCents();
    const delivery = this.getDeliveryCents();
    const totalCents = subtotal - discount + delivery;
    return `$${(totalCents / 100).toFixed(2)}`;
  }
}
