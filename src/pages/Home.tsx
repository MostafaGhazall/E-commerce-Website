import { useEffect } from 'react';
import { useProductStore } from '../contexts/useStore';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { products, loadProducts } = useProductStore();
  const { t } = useTranslation();

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, []);

  const featured = products.slice(0, 4);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Hero */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-maroon to-red-800 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('welcome')}</h1>
        <p className="max-w-xl mx-auto text-lg mb-6">{t('intro')}</p>
        <Link
          to="/products"
          className="inline-block bg-white text-maroon font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          {t('shopNow')}
        </Link>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto py-16 px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">{t('categories.clothing')}</h3>
          <p className="text-sm">{t('categories.clothingDesc')}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">{t('categories.accessories')}</h3>
          <p className="text-sm">{t('categories.accessoriesDesc')}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <h3 className="text-xl font-bold mb-2">{t('categories.eco')}</h3>
          <p className="text-sm">{t('categories.ecoDesc')}</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">{t('featured')}</h2>
        {featured.length === 0 ? (
          <p className="text-center text-gray-500">{t('noProducts')}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-4 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">{t('cta.title')}</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-300">{t('cta.desc')}</p>
        <Link
          to="/products"
          className="inline-block bg-maroon text-white font-medium px-6 py-3 rounded hover:bg-opacity-90 transition"
        >
          {t('cta.button')}
        </Link>
      </section>
    </div>
  );
};

export default Home;
