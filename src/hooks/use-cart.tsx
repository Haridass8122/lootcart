import { createContext, useContext, useState, ReactNode, useCallback } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartCtx {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const Ctx = createContext<CartCtx | null>(null);

const seed: CartItem[] = [];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(seed);
  const [isOpen, setOpen] = useState(false);

  const add: CartCtx["add"] = useCallback((item, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      return [...prev, { ...item, quantity: qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), []);
  const update = useCallback(
    (id: string, qty: number) => setItems((p) => p.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))),
    [],
  );
  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Ctx.Provider
      value={{
        items,
        isOpen,
        openCart: () => setOpen(true),
        closeCart: () => setOpen(false),
        add,
        remove,
        update,
        clear,
        count,
        subtotal,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const inr = (n: number) => `₹${n.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
