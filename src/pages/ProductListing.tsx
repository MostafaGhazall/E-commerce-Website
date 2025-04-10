import { useEffect } from 'react';
import { useProductStore } from '../contexts/useStore';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const {
    filteredProducts,
    loadProducts,
    loading,
    setSearchQuery,
    setCategoryFilter,
    searchQuery,
    categoryFilter,
  } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, []);

  const categories = ['clothing', 'accessories']; // dynamic later

  if (loading)
    return (
      <div className="text-center py-10 text-[var(--primary-orange)]">
        Loading products...
      </div>
    );

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Filter controls */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full sm:w-1/3 px-3 py-2 border border-[var(--primary-orange)] rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-1/4 px-3 py-2 border border-[var(--primary-orange)] rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-orange)]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Product grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-[var(--primary-orange)]">
            No matching products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
