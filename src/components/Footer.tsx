export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h2 className="font-semibold text-maroon dark:text-white mb-2">MyShop</h2>
          <p className="text-sm">Modern shopping made simple.</p>
        </div>

        <div>
          <h3 className="font-medium mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/">Home</a></li>
            <li><a href="/products">Shop</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Customer</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="/profile">Account</a></li>
            <li><a href="/orders">Order History</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Social</h3>
          <ul className="space-y-1 text-sm">
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-gray-300 dark:border-gray-700">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
