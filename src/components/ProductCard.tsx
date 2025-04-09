import { Product } from '../types/Product';
import { useCartStore } from '../contexts/useCartStore';
import toast from 'react-hot-toast';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-bold text-lg">{product.name}</h3>
      <p className="text-maroon font-semibold">${product.price.toFixed(2)}</p>
      <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

      <button
        onClick={handleAddToCart}
        className="mt-3 bg-maroon text-white px-4 py-2 rounded hover:bg-opacity-90"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
