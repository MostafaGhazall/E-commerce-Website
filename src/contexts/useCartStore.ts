import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "../types/CartItem";

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size?: string) => void;
  clearCart: () => void;
  updateQuantity: (
    id: string,
    quantity: number,
    size?: string
  ) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (item) => {
        const existing = get().cart.find(
          (i) => i.id === item.id && i.size === item.size
        );
        if (existing) {
          // Update quantity if already exists
          set({
            cart: get().cart.map((i) =>
              i.id === item.id && i.size === item.size
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ cart: [...get().cart, item] });
        }
      },

      removeFromCart: (id, size) => {
        set({ cart: get().cart.filter((i) => i.id !== id || i.size !== size) });
      },

      clearCart: () => set({ cart: [] }),

      updateQuantity: (id, quantity, size) => {
        if (quantity <= 0) {
          set({
            cart: get().cart.filter((i) => !(i.id === id && i.size === size)),
          });
        } else {
          set({
            cart: get().cart.map((i) =>
              i.id === id && i.size === size ? { ...i, quantity } : i
            ),
          });
        }
      },
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);
