import { useEffect } from 'react';
import { useProductStore } from '../contexts/useStore';
import ProductCard from '../components/ProductCard';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ProductListing = () => {
  const {
    filteredProducts,
    loadProducts,
    loading,
    setSearchQuery,
    setCategoryFilter,
    categoryFilter,
    sortOption,
    setSortOption,
    sortProducts,
    resetFilters,
  } = useProductStore();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sort = searchParams.get('sort') || '';

    setSearchQuery(search);
    setCategoryFilter(category);
    setSortOption(sort);
    sortProducts(sort);
  }, [searchParams]);

  const categories = ['clothing', 'accessories'];

  const handleCategoryClick = (category: string) => {
    const query = new URLSearchParams(searchParams);
    query.set('category', category);
    if (sortOption) query.set('sort', sortOption);
    navigate(`/products?${query.toString()}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);
    sortProducts(selectedSort);
    const query = new URLSearchParams(searchParams);
    if (selectedSort) {
      query.set('sort', selectedSort);
    } else {
      query.delete('sort');
    }
    navigate(`/products?${query.toString()}`);
  };

  const handleClearFilters = () => {
    resetFilters();
    navigate('/products');
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-[var(--primary-orange)]">
        Loading products...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar with Categories */}
        <aside className="md:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--primary-orange)]">
              Categories
            </h2>
            <button
              onClick={handleClearFilters}
              className="text-xs text-red-600 hover:underline"
            >
              Clear Filters
            </button>
          </div>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className={`block w-full text-left px-4 py-2 rounded hover:bg-[var(--primary-orange)] hover:text-white transition ${
                    categoryFilter === cat
                      ? 'bg-[var(--primary-orange)] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid and Sorting */}
        <main className="md:col-span-3">
          <div className="flex justify-end mb-6">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border border-gray-300 px-3 py-2 rounded shadow-sm"
            >
              <option value="">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="alpha">Alphabetical</option>
            </select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center text-[var(--primary-orange)]">
              No matching products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductListing;
