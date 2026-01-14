import { useMemo } from "react";
import type { Product } from "../domain/catalog";

interface Props {
  items: string[];
  catalog: Product[];
  subtotalCents: number;
  discountCents: number;
  deliveryCents: number;
  total: string;
  onAdd: (code: string) => void;
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
  onAdd,
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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700">
      {isEmpty ? (
        <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Add products to get started
        </div>
      ) : (
        <>
          <div className="p-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {items.length} items
            </span>
            <button
              onClick={onClear}
              className="text-xs text-red-500 hover:text-red-600 font-medium"
            >
              Clear
            </button>
          </div>

          <ul className="divide-y divide-slate-100 dark:divide-slate-700">
            {grouped.map(([code, qty]) => {
              const product = catalogMap.get(code);
              if (!product) return null;
              return (
                <li key={code} className="flex items-center gap-2 p-3 text-sm">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.code[0]}
                  </div>
                  <span className="flex-1 truncate font-medium text-slate-900 dark:text-white">
                    {product.name}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onRemove(code)}
                      className="w-6 h-6 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-xs font-bold">
                      {qty}
                    </span>
                    <button
                      onClick={() => onAdd(code)}
                      className="w-6 h-6 rounded bg-brand-600 hover:bg-brand-700 flex items-center justify-center text-white text-xs font-bold"
                    >
                      +
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">
                Subtotal
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                ${(subtotalCents / 100).toFixed(2)}
              </span>
            </div>
            {discountCents > 0 && (
              <div className="flex justify-between">
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Discount
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  -${(discountCents / 100).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">
                Delivery
              </span>
              <span className="font-medium text-slate-900 dark:text-white">
                {deliveryCents === 0
                  ? "Free"
                  : `$${(deliveryCents / 100).toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-600">
              <span className="font-bold text-slate-900 dark:text-white">
                Total
              </span>
              <span className="font-bold text-brand-600 dark:text-brand-400">
                {total}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
