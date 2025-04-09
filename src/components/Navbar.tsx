import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../contexts/useCartStore";
import { usePreferenceStore } from "../contexts/usePreferenceStore";
import { useTranslation } from 'react-i18next';
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const theme = usePreferenceStore((state) => state.theme);
  const toggleTheme = usePreferenceStore((state) => state.toggleTheme);

  const language = usePreferenceStore((state) => state.language);
  const setLanguage = usePreferenceStore((state) => state.setLanguage);

  const { t, i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-maroon dark:text-white">
          MyShop
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-maroon font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-maroon font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }
          >
            {t("shop")}
          </NavLink>
          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive
                ? "text-maroon font-semibold"
                : "text-gray-700 dark:text-gray-200"
            }
          >
            {t("wishlist")}
          </NavLink>
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
          <button
            onClick={toggleTheme}
            className="text-sm text-gray-500 dark:text-gray-300"
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "ar")}
            className="text-sm border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 dark:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-4 space-y-4 border-t border-gray-200 dark:border-gray-700">
          <NavLink
            to="/"
            className="block text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/products"
            className="block text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            {t("shop")}
          </NavLink>
          <NavLink
            to="/wishlist"
            className="block text-gray-700 dark:text-gray-200"
            onClick={() => setMenuOpen(false)}
          >
            {t("wishlist")}
          </NavLink>
          <NavLink
            to="/cart"
            className="block text-gray-700 dark:text-gray-200 relative"
            onClick={() => setMenuOpen(false)}
          >
            🛒 {cartCount > 0 && (
              <span className="ml-1 bg-maroon text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={toggleTheme}
              className="text-sm text-gray-500 dark:text-gray-300"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "ar")}
              className="text-sm border rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
            >
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}
