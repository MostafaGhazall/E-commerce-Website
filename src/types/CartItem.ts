export interface CartItem {
    id: string;
    quantity: number;
    size?: string; // optional if your product has size variants
  }