import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../contexts/useCartStore";
import { usePreferenceStore } from "../contexts/usePreferenceStore";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const language = usePreferenceStore((state) => state.language);
  const setLanguage = usePreferenceStore((state) => state.setLanguage);

  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem("lang", language);
  }, [language]);

  return (
    <nav className="bg-theme shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white">
          MyShop
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4 items-center">
          {["/", "/products", "/wishlist"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-white font-semibold"
                  : "text-white/80 hover:text-white"
              }
            >
              {t(["home", "shop", "wishlist"][i])}
            </NavLink>
          ))}

          {/* Cart Icon */}
          <NavLink to="/cart" className="relative text-white hover:text-theme">
            <span className="text-base">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-white text-theme text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          {/* Language selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "ar")}
            className="text-sm bg-white text-gray-800 px-2 py-1 rounded"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
          </select>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-theme px-4 py-4 space-y-4 border-t border-theme/40">
          {["/", "/products", "/wishlist", "/cart"].map((path, i) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block text-white"
            >
              {t(["home", "shop", "wishlist", "cart"][i])}
            </NavLink>
          ))}

          <div className="flex items-center gap-4 pt-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "ar")}
              className="text-sm bg-white text-gray-800 px-2 py-1 rounded"
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
