import { useCartStore } from "../contexts/useCartStore";
import { useProductStore } from "../contexts/useStore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { products, loadProducts, loading } = useProductStore();
  const { t } = useTranslation();

  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (products.length === 0) loadProducts();
  }, []);

  const getProductDetails = (id: string) => products.find((p) => p.id === id);

  const total = cart.reduce((acc, item) => {
    const product = getProductDetails(item.id);
    if (!product) return acc;
    return acc + product.price * item.quantity;
  }, 0);

  const handleRemove = (id: string, size?: string, color?: string) => {
    removeFromCart(id, size, color);
    toast.success(t("Item removed from cart"));
  };

  const handleClearCart = () => {
    clearCart();
    setConfirmClear(false);
    toast.success(t("Cart cleared"));
  };

  const handleQuantityChange = (
    id: string,
    qty: number,
    size?: string,
    color?: string
  ) => {
    if (qty < 1) return;
    updateQuantity(id, qty, size, color);
    toast.success(t("Quantity updated"));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin h-8 w-8 border-4 border-[var(--primary-orange)] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <img
          src="/images/empty-cart.svg"
          alt="Empty cart"
          className="mx-auto mb-6 w-48 h-auto"
        />
        <h2 className="text-xl font-bold mb-4">{t("Your Cart is Empty")}</h2>
        <Link to="/products" className="text-[var(--primary-orange)] underline">
          {t("Go Shopping")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 bg-white">
      <h2 className="text-2xl font-bold mb-6">{t("Your Cart")}</h2>

      <div className="space-y-6">
        {cart.map((item) => {
          const product = getProductDetails(item.id);
          if (!product) return null;

          return (
            <div
              key={`${item.id}-${item.size || "default"}-${
                item.color || "default"
              }`}
              className="p-4 rounded-md border shadow-sm bg-gray-50 flex flex-col sm:flex-row justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  onError={(e) =>
                    (e.currentTarget.src = "/images/default-product.png")
                  }
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">
                    ${product.price.toFixed(2)}
                  </p>
                  {item.size && (
                    <p className="text-xs text-gray-500 mt-1">
                      {t("Size")}: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {t("Color")}:
                      <span
                        className="inline-block w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color }}
                        title={item.colorName}
                      ></span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.quantity - 1,
                        item.size,
                        item.color
                      )
                    }
                    className="px-2 py-1 border rounded text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        item.quantity + 1,
                        item.size,
                        item.color
                      )
                    }
                    className="px-2 py-1 border rounded text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id, item.size, item.color)}
                  className="text-red-500 hover:underline cursor-pointer text-sm"
                >
                  {t("Remove")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <button
          onClick={() => setConfirmClear(true)}
          className="text-red-500 underline hover:text-red-700 cursor-pointer"
        >
          {t("Clear Cart")}
        </button>
        <div className="text-xl font-bold">
          {t("Total")}: ${total.toFixed(2)}
        </div>
      </div>

      <div className="relative mt-6 sm:static bottom-0 left-0 right-0 bg-white sm:bg-transparent sm:shadow-none p-4 sm:p-0 flex justify-center sm:justify-end">
        <Link
          to="/checkout"
          className="bg-[var(--primary-orange)] text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
        >
          {t("Proceed to Checkout")}
        </Link>
      </div>

      {confirmClear && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-3">{t("Are you sure?")}</h3>
            <p className="text-sm text-gray-600 mb-6">
              {t("This will remove all items from your cart.")}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmClear(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                {t("Cancel")}
              </button>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {t("Confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
