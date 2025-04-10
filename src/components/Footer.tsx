import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Twitter,
  Facebook
} from 'lucide-react';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const quickLinks = [
    { label: t('home'), to: '/' },
    { label: t('shop'), to: '/products' },
    { label: t('cart'), to: '/cart' },
    { label: t('wishlist'), to: '/wishlist' },
  ];

  const customerLinks = [
    { label: t('account'), to: '/profile' },
    { label: t('orderHistory'), to: '/orders' },
    { label: t('contact'), to: '/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, label: t('instagram'), href: '#' },
    { icon: Twitter, label: t('twitter'), href: '#' },
    { icon: Facebook, label: t('facebook'), href: '#' },
  ];

  return (
    <footer className="bg-theme/10 text-gray-700 mt-10" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Brand / Description */}
        <div>
          <h2 className="font-semibold text-theme mb-2">MyShop</h2>
          <p className="text-sm">{t('description')}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-medium mb-2">{t('quickLinks')}</h3>
          <ul className="space-y-1 text-sm">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-theme transition-colors duration-200 focus:outline-none focus-visible:ring-2 ring-theme"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer */}
        <div>
          <h3 className="font-medium mb-2">{t('customer')}</h3>
          <ul className="space-y-1 text-sm">
            {customerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="hover:text-theme transition-colors duration-200 focus:outline-none focus-visible:ring-2 ring-theme"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-medium mb-2">{t('social')}</h3>
          <ul className="space-y-2 text-sm">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-theme transition-colors duration-200 focus:outline-none focus-visible:ring-2 ring-theme"
                >
                  <Icon size={18} /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-theme/30">
        &copy; {new Date().getFullYear()} MyShop. {t('rights')}
      </div>
    </footer>
  );
}
