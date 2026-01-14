import { useMemo } from "react";
import type { Product } from "../domain/catalog";

interface Props {
  products: Product[];
  onAdd: (code: string) => void;
}

const colorMap: Record<string, string> = {
  R01: "bg-red-500",
  G01: "bg-green-500",
  B01: "bg-blue-500",
};

export function ProductGrid({ products, onAdd }: Props) {
  const cards = useMemo(
    () =>
      products.map((p) => (
        <div
          key={p.code}
          className="flex flex-col bg-card rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700"
        >
          <div
            className={`w-12 h-12 rounded-xl ${
              colorMap[p.code] ?? "bg-slate-400"
            } mb-4`}
          />
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {p.code}
          </span>
          <h3 className="text-lg font-semibold mt-1">{p.name}</h3>
          <span className="text-xl font-bold text-brand-600 dark:text-brand-500 mt-2">
            ${(p.priceCents / 100).toFixed(2)}
          </span>
          <button
            onClick={() => onAdd(p.code)}
            className="mt-4 py-2 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
          >
            Add to Basket
          </button>
        </div>
      )),
    [products, onAdd]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards}
    </div>
  );
}
