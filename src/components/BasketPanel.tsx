import { useMemo } from "react";
import type { Product } from "../domain/catalog";

interface Props {
  items: string[];
  catalog: Product[];
  subtotalCents: number;
  discountCents: number;
  deliveryCents: number;
  total: string;
  onRemove: (code: string) => void;
  onClear: () => void;
}

export function BasketPanel({
  items,
  catalog,
  subtotalCents,
  discountCents,
  deliveryCents,
  total,
  onRemove,
  onClear,
}: Props) {
  const catalogMap = useMemo(
    () => new Map(catalog.map((p) => [p.code, p])),
    [catalog]
  );

  const grouped = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1));
    return Array.from(counts.entries());
  }, [items]);

  const isEmpty = items.length === 0;

  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Basket</h2>
        {!isEmpty && (
          <button
            onClick={onClear}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Clear
          </button>
        )}
      </div>

      {isEmpty ? (
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          No items yet.
        </p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {grouped.map(([code, qty]) => {
              const product = catalogMap.get(code);
              if (!product) return null;
              return (
                <li
                  key={code}
                  className="flex items-center justify-between text-sm"
                >
                  <span>
                    {product.name}{" "}
                    <span className="text-slate-500">×{qty}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">
                      ${((product.priceCents * qty) / 100).toFixed(2)}
                    </span>
                    <button
                      onClick={() => onRemove(code)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span>${(subtotalCents / 100).toFixed(2)}</span>
            </div>
            {discountCents > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${(discountCents / 100).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery</span>
              <span>
                {deliveryCents === 0
                  ? "Free"
                  : `$${(deliveryCents / 100).toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>Total</span>
              <span className="text-brand-600 dark:text-brand-500">
                {total}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
