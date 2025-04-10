import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
}


interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  shipping: {
    name: string;
    email: string;
    address: string;
  };
}

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'order-history-storage',
    }
  )
);
