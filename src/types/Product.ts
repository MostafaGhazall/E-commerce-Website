export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    stock: number;
    rating: number;
    reviews: string[];
    category: string;
    sizes?: string[];
  }
  