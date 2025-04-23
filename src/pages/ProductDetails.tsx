import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../contexts/useStore';
import { useCartStore } from '../contexts/useCartStore';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === id);
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  if (!product) {
    return (
      <div className="text-center text-[var(--primary-orange)] py-20">
        Product not found.
      </div>
    );
  }

  const handleAdd = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size.');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      size: selectedSize,
    });

    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 bg-white text-gray-900">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image */}
        <div className="flex-1">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-96 object-cover rounded shadow"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[var(--primary-orange)] mb-4">
            {product.name}
          </h1>
          <p className="text-xl font-semibold text-[var(--primary-redish)] mb-2">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <label className="block mb-2 font-medium text-sm">Select Size:</label>
              <select
                value={selectedSize || ''}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/2"
              >
                <option value="">Choose a size</option>
                {product.sizes.map((size: string) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleAdd}
            className="bg-[var(--primary-orange)] hover:bg-[var(--primary-amber)] text-white px-6 py-3 rounded transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
