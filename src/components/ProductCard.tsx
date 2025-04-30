import { Product } from '../types/Product';
// import { useCartStore } from '../contexts/useCartStore';
// import toast from 'react-hot-toast';
import { Heart, HeartOff } from 'lucide-react';
import { useWishlistStore } from '../contexts/useWishlistStore';
import { Link } from 'react-router-dom';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  // const addToCart = useCartStore((state) => state.addToCart);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  // const handleAddToCart = () => {
  //   addToCart({
  //     id: product.id,
  //     name: product.name,
  //     image: product.images[0],
  //     price: product.price,
  //     quantity: 1,
  //   });
  //   toast.success(`${product.name} added to cart!`);
  // };

  return (
    <div className="relative border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition bg-white text-gray-900 flex flex-col h-full">
      {/* Wishlist Icon */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-2 right-2 hover:cursor-pointer"
        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? (
          <Heart className="text-red-500 w-5 h-5" />
        ) : (
          <HeartOff className="text-gray-400 w-5 h-5" />
        )}
      </button>

      {/* Product Image + Info wrapped in Link */}
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-contain rounded mb-3"
        />
        <h3 className="font-bold text-lg text-[var(--primary-orange)] mb-1">{product.name}</h3>
        <p className="text-[var(--primary-redish)] font-semibold mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{product.description}</p>
      </Link>

      {/* Add to Cart */}
      {/* <button
        onClick={handleAddToCart}
        className="mt-auto w-full bg-[var(--primary-orange)] text-white px-4 py-2 rounded hover:bg-opacity-90 transition hover:cursor-pointer"
      >
        Add to Cart
      </button> */}
    </div>
  );
};

export default ProductCard;
