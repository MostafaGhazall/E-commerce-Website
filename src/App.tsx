import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { usePreferenceStore } from './contexts/usePreferenceStore';
import { useAuthStore } from './contexts/useAuthStore';
import { seedProducts } from './services/seedProducts';
import { useProductStore } from './contexts/useStore';

import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import UserProfile from './pages/UserProfile';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const language = usePreferenceStore((state) => state.language);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [language]);

  useEffect(() => {
    const load = async () => {
      await seedProducts(); // Step 1: seed IndexedDB
      await useProductStore.getState().loadProducts(); // Step 2: load into Zustand
    };
    load();
  }, []);

  // Protected Route Wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <div className="bg-white min-h-screen flex flex-col text-gray-900">
        <Toaster position="top-right" />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
