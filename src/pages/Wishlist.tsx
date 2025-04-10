import { useWishlistStore } from '../contexts/useWishlistStore';
import { useProductStore } from '../contexts/useStore';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const { wishlist } = useWishlistStore();
  const { products } = useProductStore();

  const wishlistedProducts = products.filter((p) =>
    wishlist.some((item) => item.id === p.id)
  );

  if (wishlistedProducts.length === 0)
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-xl mb-4">Your wishlist is empty.</p>
        <Link to="/products" className="text-theme underline hover:text-theme/80 transition">
          Browse products
        </Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
