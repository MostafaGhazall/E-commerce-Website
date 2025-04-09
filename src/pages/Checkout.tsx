import { useCartStore } from '../contexts/useCartStore';
import { useProductStore } from '../contexts/useStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const { products, loadProducts } = useProductStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, []);

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const total = cart.reduce((acc, item) => {
    const product = getProduct(item.id);
    return acc + (product?.price ?? 0) * item.quantity;
  }, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (Object.values(form).some((val) => val.trim() === '')) {
      toast.error('Please fill out all fields');
      return;
    }

    toast.success('Order placed!');
    clearCart();

    // Redirect to homepage or thank-you page
    setTimeout(() => navigate('/'), 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
      {/* Shipping / Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
        <input
          name="fullName"
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="address"
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="zip"
          type="text"
          placeholder="ZIP Code"
          value={form.zip}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="country"
          type="text"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-maroon text-white py-2 rounded hover:bg-opacity-90"
        >
          Place Order
        </button>
      </form>

      {/* Order Summary */}
      <div>
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cart.map((item) => {
            const product = getProduct(item.id);
            if (!product) return null;

            return (
              <div
                key={item.id}
                className="flex justify-between border-b pb-2"
              >
                <div>
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="font-semibold">
                  ${(product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })}
          <div className="flex justify-between font-bold pt-4 border-t mt-4">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
