export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string; // Optional if size variants exist
}

export interface CartItemProps extends CartItem {
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}