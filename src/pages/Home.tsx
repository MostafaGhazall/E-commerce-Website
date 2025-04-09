import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <div>
      <header className="bg-gray-800 text-white p-4">
        <Link to="/">Home</Link> | <Link to="/products">Products</Link>
      </header>
      <main className="p-4">
        <h1 className="text-2xl font-bold">Welcome to Our Store</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
    </div>
  );
};

export default Home;
