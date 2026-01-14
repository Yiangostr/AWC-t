export interface DeliveryRule {
  maxCents: number;
  costCents: number;
}

export const defaultDeliveryRules: DeliveryRule[] = [
  { maxCents: 5000, costCents: 495 },
  { maxCents: 9000, costCents: 295 },
  { maxCents: Infinity, costCents: 0 },
];

export function calcDelivery(
  subtotalCents: number,
  rules: DeliveryRule[]
): number {
  for (const rule of rules) {
    if (subtotalCents < rule.maxCents) return rule.costCents;
  }
  return 0;
}
