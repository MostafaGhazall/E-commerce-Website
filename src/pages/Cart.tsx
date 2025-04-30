import { useCartStore } from "../contexts/useCartStore";
import { useProductStore } from "../contexts/useStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const { products, loadProducts, loading } = useProductStore();

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
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared");
  };

  const handleQuantityChange = (
    id: string,
    qty: number,
    size?: string,
    color?: string
  ) => {
    if (qty < 1) return;
    updateQuantity(id, qty, size, color);
    toast.success("Quantity updated");
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
        <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/products" className="text-[var(--primary-orange)] underline">
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 bg-white">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-6">
        {cart.map((item) => {
          const product = getProductDetails(item.id);
          if (!product) return null;

          return (
            <div
              key={`${item.id}-${item.size || "default"}-${
                item.color || "default"
              }`}
              className="flex items-center justify-between border-b pb-4 gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
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
                      Size: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      Color:
                      <span
                        className="inline-block w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id,
                      parseInt(e.target.value),
                      item.size,
                      item.color
                    )
                  }
                  className="w-16 border rounded px-2 py-1 text-center"
                  aria-label={`Quantity for ${product.name}`}
                />
                <button
                  onClick={() => handleRemove(item.id, item.size, item.color)}
                  className="text-red-500 hover:underline text-sm"
                  aria-label={`Remove ${product.name}`}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={handleClearCart}
          className="text-red-500 underline hover:text-red-700"
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
      </div>

      <div className="mt-6 text-right">
        <Link
          to="/checkout"
          className="bg-[var(--primary-orange)] text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
