import { Product } from '../types/Product';
import { addProducts } from './indexedDB';

const demoProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Tee',
    price: 25,
    description: 'A timeless piece for any wardrobe.',
    images: ['/assets/tee.jpg'],
    stock: 10,
    rating: 4.5,
    reviews: ['Great quality', 'Soft material'],
    category: 'clothing',
  },
  {
    id: '2',
    name: 'Eco Bottle',
    price: 15,
    description: 'Reusable water bottle made from eco-friendly materials.',
    images: ['/assets/bottle.jpg'],
    stock: 20,
    rating: 4.7,
    reviews: ['Useful and stylish', 'Keeps water cold'],
    category: 'accessories',
  },
];

export const seedProducts = async () => {
  const alreadySeeded = localStorage.getItem('productsSeeded');
  if (!alreadySeeded) {
    await addProducts(demoProducts);
    localStorage.setItem('productsSeeded', 'true');
  }
};
