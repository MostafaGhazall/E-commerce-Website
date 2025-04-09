import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartStore } from "../contexts/useCartStore";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setIsDark(!isDark);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-maroon dark:text-white">
          MyShop
        </Link>

        {/* Navigation Links */}
        <div className="space-x-4 flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-maroon font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-maroon font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive
                ? "text-maroon font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }
          >
            Wishlist
          </NavLink>

          {/* Cart Icon with Count */}
          <NavLink
            to="/cart"
            className="relative text-gray-700 dark:text-gray-200 hover:text-maroon"
          >
            <span className="text-base">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-maroon text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="ml-4 text-sm text-gray-500 dark:text-gray-300"
        >
          {isDark ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </nav>
  );
}
