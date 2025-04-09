import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { seedProducts } from './services/seedProducts';

import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserProfile from './pages/UserProfile';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  useEffect(() => {
    seedProducts();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col">
        <Toaster position="top-right" />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
