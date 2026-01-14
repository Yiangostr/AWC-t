import { useCallback, useMemo, useReducer } from "react";
import { Basket } from "./domain/basket";
import { defaultCatalog } from "./domain/catalog";
import { defaultDeliveryRules } from "./domain/delivery";
import { defaultOffers } from "./domain/offers";
import { initTheme, type Theme } from "./ui/theme";
import { ThemeToggle } from "./components/ThemeToggle";
import { ProductGrid } from "./components/ProductGrid";
import { BasketPanel } from "./components/BasketPanel";
import productsData from "./data/products.json";

type Action =
  | { type: "ADD"; code: string }
  | { type: "REMOVE"; code: string }
  | { type: "CLEAR" }
  | { type: "SET_THEME"; theme: Theme };

interface State {
  items: string[];
  theme: Theme;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD":
      return { ...state, items: [...state.items, action.code] };
    case "REMOVE": {
      const idx = state.items.indexOf(action.code);
      if (idx === -1) return state;
      const next = [...state.items];
      next.splice(idx, 1);
      return { ...state, items: next };
    }
    case "CLEAR":
      return { ...state, items: [] };
    case "SET_THEME":
      return { ...state, theme: action.theme };
    default:
      return state;
  }
}

const initialState: State = {
  items: [],
  theme: initTheme(),
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const basket = useMemo(() => {
    const b = new Basket(defaultCatalog, defaultDeliveryRules, defaultOffers);
    state.items.forEach((code) => b.add(code));
    return b;
  }, [state.items]);

  const subtotalCents = useMemo(() => basket.getSubtotalCents(), [basket]);
  const discountCents = useMemo(() => basket.getDiscountCents(), [basket]);
  const deliveryCents = useMemo(() => basket.getDeliveryCents(), [basket]);
  const total = useMemo(() => basket.total(), [basket]);

  const handleAdd = useCallback(
    (code: string) => dispatch({ type: "ADD", code }),
    []
  );
  const handleRemove = useCallback(
    (code: string) => dispatch({ type: "REMOVE", code }),
    []
  );
  const handleClear = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const handleThemeToggle = useCallback(
    (t: Theme) => dispatch({ type: "SET_THEME", theme: t }),
    []
  );

  const offer = productsData.offers[0];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="shrink-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
        <div className="px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              A
            </div>
            <span className="font-semibold text-sm text-slate-900 dark:text-white">
              Acme Widgets
            </span>
          </div>
          <ThemeToggle theme={state.theme} onToggle={handleThemeToggle} />
        </div>
      </header>

      {offer && (
        <div className="max-w-3xl mx-auto w-full px-3 mt-4">
          <div className="bg-green-600 text-white py-2 px-3 text-center text-xs font-medium rounded-lg shadow-sm">
            {offer.description}
          </div>
        </div>
      )}

      <main className="flex-1 max-w-3xl mx-auto w-full px-3 py-4">
        <div className="grid md:grid-cols-2 gap-4 h-full">
          <section>
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
              Products
            </h2>
            <ProductGrid products={defaultCatalog} onAdd={handleAdd} />

            <div className="mt-4 p-3 rounded-xl bg-white dark:bg-slate-800 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700 text-xs">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Delivery rates
              </p>
              <ul className="space-y-0.5 text-slate-600 dark:text-slate-400">
                <li>Under $50: $4.95</li>
                <li>Under $90: $2.95</li>
                <li>$90+: Free</li>
              </ul>
            </div>
          </section>

          <aside className="md:sticky md:top-4 md:self-start">
            <h2 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
              Basket
            </h2>
            <BasketPanel
              items={state.items}
              catalog={defaultCatalog}
              subtotalCents={subtotalCents}
              discountCents={discountCents}
              deliveryCents={deliveryCents}
              total={total}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onClear={handleClear}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default App;
