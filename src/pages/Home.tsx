import { useEffect } from 'react';
import { useProductStore } from '../contexts/useStore';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const { products, loadProducts } = useProductStore();

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, []);

  const featured = products.slice(0, 4); // or use custom tags later

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Hero */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-maroon to-red-800 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to MyShop</h1>
        <p className="max-w-xl mx-auto text-lg mb-6">
          Discover quality products tailored for your lifestyle.
        </p>
        <Link
          to="/products"
          className="inline-block bg-white text-maroon font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Categories / Highlights */}
      <section className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">Clothing</h3>
          <p className="text-sm">Timeless fashion essentials</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">Accessories</h3>
          <p className="text-sm">Bags, bottles, and more</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">Eco Picks</h3>
          <p className="text-sm">Sustainable and smart</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Products</h2>
        {featured.length === 0 ? (
          <p className="text-center text-gray-500">No products yet...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Don't miss out</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Great deals and handpicked collections await.
        </p>
        <Link
          to="/products"
          className="inline-block bg-maroon text-white font-medium px-6 py-3 rounded hover:bg-opacity-90 transition"
        >
          Browse All Products
        </Link>
      </section>
    </div>
  );
};

export default Home;
