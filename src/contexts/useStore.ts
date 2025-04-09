import { create } from 'zustand';
import { Product } from '../types/Product';
import { getAllProducts } from '../services/indexedDB';
import { getProductsFromLocalStorage, saveProductsToLocalStorage } from '../services/localStorage';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  searchQuery: string;
  categoryFilter: string;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  loadProducts: () => Promise<void>;
  filterProducts: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  loading: false,
  searchQuery: '',
  categoryFilter: '',

  setSearchQuery: (query) => {
    set({ searchQuery: query }, false);
    get().filterProducts();
  },

  setCategoryFilter: (category) => {
    set({ categoryFilter: category }, false);
    get().filterProducts();
  },

  loadProducts: async () => {
    set({ loading: true });

    try {
      const products = await getAllProducts();
      set({ products });
      saveProductsToLocalStorage(products);
    } catch (error) {
      console.warn('IndexedDB failed. Falling back to localStorage.', error);
      const fallbackProducts = getProductsFromLocalStorage();
      set({ products: fallbackProducts });
    } finally {
      get().filterProducts(); // initial filtering
      set({ loading: false });
    }
  },

  filterProducts: () => {
    const { products, searchQuery, categoryFilter } = get();
    const lowerQuery = searchQuery.toLowerCase();

    const filtered = products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(lowerQuery);
      const matchCategory = categoryFilter ? product.category === categoryFilter : true;
      return matchName && matchCategory;
    });

    set({ filteredProducts: filtered });
  },
}));

