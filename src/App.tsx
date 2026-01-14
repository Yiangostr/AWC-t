import { useCallback, useMemo, useReducer } from "react";
import { Basket } from "./domain/basket";
import { defaultCatalog } from "./domain/catalog";
import { defaultDeliveryRules } from "./domain/delivery";
import { defaultOffers } from "./domain/offers";
import { initTheme, type Theme } from "./ui/theme";
import { ThemeToggle } from "./components/ThemeToggle";
import { ProductGrid } from "./components/ProductGrid";
import { BasketPanel } from "./components/BasketPanel";

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

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Acme Widget Co</h1>
        <ThemeToggle theme={state.theme} onToggle={handleThemeToggle} />
      </header>

      <main className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <ProductGrid products={defaultCatalog} onAdd={handleAdd} />
        </section>

        <aside>
          <BasketPanel
            items={state.items}
            catalog={defaultCatalog}
            subtotalCents={subtotalCents}
            discountCents={discountCents}
            deliveryCents={deliveryCents}
            total={total}
            onRemove={handleRemove}
            onClear={handleClear}
          />
        </aside>
      </main>
    </div>
  );
}

export default App;
