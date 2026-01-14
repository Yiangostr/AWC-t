# Acme Widget Co - Basket POC

A proof-of-concept sales basket for Acme Widget Co built with React, TypeScript, and Tailwind CSS.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Products

| Name         | Code | Price  |
| ------------ | ---- | ------ |
| Red Widget   | R01  | $32.95 |
| Green Widget | G01  | $24.95 |
| Blue Widget  | B01  | $7.95  |

## Pricing Rules

### Delivery

Delivery cost is calculated on the **post-discount subtotal**:

| Subtotal    | Delivery |
| ----------- | -------- |
| Under $50   | $4.95    |
| Under $90   | $2.95    |
| $90 or more | Free     |

### Offers

**Red Widget Offer**: Buy one red widget, get the second half price.

- For every pair of R01 items, one is discounted by 50%.
- Example: 3× R01 = 2 full price + 1 half price (1 pair discounted).

## Example Totals

| Basket               | Total  |
| -------------------- | ------ |
| B01, G01             | $37.85 |
| R01, R01             | $54.37 |
| R01, G01             | $60.85 |
| B01, B01, R01, R01, R01 | $98.27 |

## Architecture

```
src/
├── domain/          # Pure TypeScript business logic
│   ├── basket.ts    # Basket class with add/total methods
│   ├── catalog.ts   # Product definitions
│   ├── delivery.ts  # Delivery cost rules
│   └── offers.ts    # Discount offers
├── components/      # React UI components
│   ├── ProductGrid.tsx
│   ├── BasketPanel.tsx
│   └── ThemeToggle.tsx
├── ui/
│   └── theme.ts     # Light/dark theme persistence
└── App.tsx          # Main application
```

## Features

- Mobile-first responsive design
- Light/dark theme with system preference detection
- Real-time basket updates
- All calculations in cents to avoid floating-point errors

## Assumptions

1. Delivery is calculated on the subtotal **after** discounts are applied.
2. The red widget offer applies to pairs only (floor division).
3. Rounding uses standard `Math.round()` for half-cent values.
