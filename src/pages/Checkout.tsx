import { useCartStore } from "../contexts/useCartStore";
import { useProductStore } from "../contexts/useStore";
import { useUserStore } from "../contexts/useUserStore"; // Autofill feature
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useOrderStore } from "../contexts/useOrderStore";

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const { products, loadProducts } = useProductStore();
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    country,
    postalcode,
    region,
    phone,
  } = useUserStore(); // User data
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addOrder } = useOrderStore();

  const [form, setForm] = useState({
    name: `${firstName} ${lastName}`.trim(),
    email: email,
    address: address,
    country: country || "",
    city: city || "",
    region: region || "",
    postalCode: postalcode || "",
    phone: phone || "",
    paymentMethod: "cash-on-delivery", // Default payment method
  });

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, [products, loadProducts]);

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const total = cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address || !form.phone) {
      toast.error(t("fillAllFields") || "Please fill in all fields");
      return;
    }

    const orderItems = cart.map((item) => {
      const product = getProduct(item.id);
      return {
        id: item.id,
        name: product?.name || "",
        price: product?.price || 0,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      };
    });

    const newOrder = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      items: orderItems,
      total,
      shipping: form,
    };

    addOrder(newOrder);
    toast.success(t("orderSuccess") || "Order placed successfully!");
    clearCart();
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-4">{t("emptyCart")}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-800 bg-white">
      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">{t("checkout")}</h2>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{t("Contact Information")}</h3>
          <input
            name="name"
            type="text"
            placeholder={t("fullName") || "Full Name"}
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded bg-white"
          />

          <input
            name="email"
            type="email"
            placeholder={t("email") || "Email"}
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded bg-white"
          />
        </div>

        {/* Shipping Information */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">{t("Shipping Information")}</h3>
          <input
            name="address"
            type="text"
            placeholder={t("Shipping Address") || "Shipping Address"}
            value={form.address}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded bg-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="city"
              type="text"
              placeholder={t("City") || "City"}
              value={form.city}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            />

            <input
              name="region"
              type="text"
              placeholder={t("Region") || "Region"}
              value={form.region}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            />

            <input
              name="postalCode"
              type="text"
              placeholder={t("Postal Code") || "Postal Code"}
              value={form.postalCode}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            />

            <input
              name="country"
              type="text"
              placeholder={t("Country") || "Country"}
              value={form.country}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded bg-white"
            />
          </div>

          <input
            name="phone"
            type="text"
            placeholder={t("Phone Number") || "Phone Number"}
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded bg-white"
          />

          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>{t("Use as Billing Address")}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-xl font-semibold">{t("Payment Method")}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {["cash-on-delivery", "master-card", "paypal", "visa"].map(
              (paymentOption) => (
                <div
                  key={paymentOption}
                  className="flex items-center justify-center space-x-2 border p-4 rounded-md"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={paymentOption}
                    onChange={handleChange}
                    checked={form.paymentMethod === paymentOption}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <img
                    src={`/images/${paymentOption
                      .toLowerCase()
                      .replace(/ /g, "-")}.png`}
                    alt={paymentOption}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[var(--primary-maroon)] text-white px-6 py-2 rounded hover:bg-opacity-90 w-full sm:w-auto mt-6"
        >
          {t("placeOrder")}
        </button>
      </form>

      {/* Order Summary */}
      <div className="space-y-4 lg:w-2/3 bg-gray-50 rounded-2xl px-6 py-6">
        <h3 className="text-xl font-semibold">{t("Order Summary")}</h3>
        <ul className="space-y-4">
          {cart.map((item) => {
            const product = getProduct(item.id);
            if (!product) return null;

            return (
              <li
                key={`${item.id}-${item.size || "default"}`}
                className="flex justify-between items-start border-b pb-4"
              >
                <div className="flex flex-col space-y-2">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.description}</p>
                  <p className="text-sm text-gray-500">
                    {t("Quantity")}: {item.quantity}
                  </p>
                  {item.size && (
                    <p className="text-xs text-gray-500">Size: {item.size}</p>
                  )}
                  {item.colorName && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      Color:
                      <span
                        className="inline-block w-4 h-4 rounded-full border ml-1"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </p>
                  )}
                </div>
                <span className="font-semibold text-lg">
                  {t("$")} {(product.price * item.quantity).toFixed(2)}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Total Section */}
        <div className="flex justify-between font-medium text-lg mt-6 border-t pt-4">
          <span>{t("Subtotal")}</span>
          <span>
            {t("$")} {total.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between font-medium text-lg mt-2">
          <span>{t("Delivery Charge")}</span>
          <span>{t("FREE")}</span>
        </div>

        <div className="flex justify-between font-bold text-xl mt-4">
          <span>{t("Total")}</span>
          <span>
            {t("$")} {total.toFixed(2)}
          </span>
        </div>

        {/* Delivery Date */}
        <div className="mt-4 text-sm text-gray-500">
          <span>{t("Estimated Delivery Within 3 to 5 Business Days.")}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
