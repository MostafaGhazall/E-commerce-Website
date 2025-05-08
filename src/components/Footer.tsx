import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuthStore } from "../contexts/useAuthStore";
// import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { user } = useAuthStore();

  const canAccess = (path: string) =>
    user || path === "/" || path === "/products";

  const quickLinks = [
    { label: t("home"), to: "/" },
    { label: t("shop"), to: "/products" },
    { label: t("cart"), to: "/cart" },
    { label: t("wishlist"), to: "/wishlist" },
  ];

  const customerLinks = [
    { label: t("footer.account"), to: "/profile" },
    { label: t("footer.orderHistory"), to: "/orderhistory" },
    { label: t("footer.contact"), to: "/contact" },
  ];

  // const socialLinks = [
  //   { icon: Instagram, label: t("instagram"), href: "#" },
  //   { icon: Twitter, label: t("twitter"), href: "#" },
  //   { icon: Facebook, label: t("facebook"), href: "#" },
  // ];

  return (
    <footer className="bg-gray-100 text-gray-700 mt-10" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Brand Description */}
        <div>
          <h2 className="font-semibold text-[var(--primary-orange)] mb-2">MyShop</h2>
          <p className="text-sm">{t("footer.description")}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-medium mb-2">{t("footer.quickLinks")}</h3>
          <ul className="space-y-1 text-sm">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={canAccess(link.to) ? link.to : "/Login"}
                  className="hover:text-[var(--primary-orange)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 ring-[var(--primary-orange)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Section */}
        <div>
          <h3 className="font-medium mb-2">{t("footer.customer")}</h3>
          <ul className="space-y-1 text-sm">
            {customerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={canAccess(link.to) ? link.to : "/Login"}
                  className="hover:text-[var(--primary-orange)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 ring-[var(--primary-orange)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Section (Optional) */}
        {/* <div>
          <h3 className="font-medium mb-2">{t("social")}</h3>
          <ul className="space-y-2 text-sm">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-[var(--primary-orange)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 ring-[var(--primary-orange)]"
                >
                  <Icon size={18} /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
      </div>

      <div className="text-center text-xs py-4 border-t border-[var(--primary-orange)]/30">
        &copy; {new Date().getFullYear()} MyShop. {t("footer.rights")}
      </div>
    </footer>
  );
}
