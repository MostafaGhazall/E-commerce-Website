import { useCartStore } from '../contexts/useCartStore';
import { useProductStore } from '../contexts/useStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const { products, loadProducts } = useProductStore();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) {
      toast.error(t('fillAllFields') || 'Please fill in all fields');
      return;
    }

    toast.success(t('orderSuccess') || 'Order placed successfully!');
    clearCart();
    navigate('/');
  };

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-4">{t('emptyCart')}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-800 bg-white">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">{t('checkout')}</h2>

        <input
          name="name"
          type="text"
          placeholder={t('fullName') || 'Full Name'}
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded bg-white"
        />

        <input
          name="email"
          type="email"
          placeholder={t('email') || 'Email'}
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded bg-white"
        />

        <input
          name="address"
          type="text"
          placeholder={t('shippingAddress') || 'Shipping Address'}
          value={form.address}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded bg-white"
        />

        <button
          type="submit"
          className="bg-[var(--primary-maroon)] text-white px-6 py-2 rounded hover:bg-opacity-90 w-full sm:w-auto"
        >
          {t('placeOrder')}
        </button>
      </form>

      {/* Order Summary */}
      <div>
        <h3 className="text-xl font-bold mb-4">{t('orderSummary')}</h3>
        <ul className="space-y-4">
          {cart.map((item) => {
            const product = getProduct(item.id);
            if (!product) return null;

            return (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">
                    {t('quantity')}: {item.quantity}
                  </p>
                </div>
                <span className="font-semibold">
                  ${(product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 border-t pt-4 flex justify-between font-bold text-lg">
          <span>{t('total')}</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
