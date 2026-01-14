import { useMemo } from "react";
import type { Product } from "../domain/catalog";

interface Props {
  products: Product[];
  onAdd: (code: string) => void;
}

export function ProductGrid({ products, onAdd }: Props) {
  const cards = useMemo(
    () =>
      products.map((p) => (
        <div
          key={p.code}
          className="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700"
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-sm"
            style={{ backgroundColor: p.color }}
          >
            {p.code[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-slate-900 dark:text-white">
              {p.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {p.code}
            </p>
          </div>
          <span className="font-bold text-brand-600 dark:text-brand-400">
            ${(p.priceCents / 100).toFixed(2)}
          </span>
          <button
            onClick={() => onAdd(p.code)}
            className="w-8 h-8 rounded-lg bg-brand-600 hover:bg-brand-700 active:scale-95 text-white flex items-center justify-center transition-all shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      )),
    [products, onAdd]
  );

  return <div className="flex flex-col gap-2">{cards}</div>;
}
