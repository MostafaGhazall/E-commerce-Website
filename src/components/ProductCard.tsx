import { Product } from '../types/Product';
import { useCartStore } from '../contexts/useCartStore';
import toast from 'react-hot-toast';
import { Heart, HeartOff } from 'lucide-react';
import { useWishlistStore } from '../contexts/useWishlistStore';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const handleAddToCart = () => {
    addToCart({ id: product.id, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="relative border border-theme rounded-lg p-4 shadow hover:shadow-md transition bg-white text-gray-900">
      {/* Wishlist Icon */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-2 right-2"
        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? (
          <Heart className="text-red-500 w-5 h-5" />
        ) : (
          <HeartOff className="text-gray-400 w-5 h-5" />
        )}
      </button>

      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-3 font-bold text-lg text-theme">{product.name}</h3>
      <p className="text-redish font-semibold">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

      <button
        onClick={handleAddToCart}
        className="mt-4 bg-theme text-white px-4 py-2 rounded hover:bg-theme transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
