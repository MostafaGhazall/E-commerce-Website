import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../contexts/useStore";
import { useCartStore } from "../contexts/useCartStore";
import { useWishlistStore } from "../contexts/useWishlistStore";
import { addReviewToProduct } from "../services/indexedDB";
import toast from "react-hot-toast";
import {
  Heart,
  HeartOff,
  Star,
  StarHalf,
  Star as StarEmpty,
} from "lucide-react";
import type { Product } from "../types/Product";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useProductStore();
  const product = products.find((p) => p.id === id);
  const addToCart = useCartStore((state) => state.addToCart);
  const isWishlisted = useWishlistStore((state) =>
    state.isWishlisted(product?.id || "")
  );

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.rating || !newReview.comment.trim()) {
      toast.error("Please provide both a rating and comment.");
      return;
    }

    if (!product) {
      toast.error("Product not found.");
      return;
    }

    const review = {
      comment: newReview.comment,
      name: "Anonymous", // Or get from user input if added
      rating: newReview.rating,
      date: new Date().toLocaleDateString(),
    };

    try {
      await addReviewToProduct(product.id, review); // Save to IndexedDB
      product.reviews.push(review); // Update UI
      setNewReview({ rating: 0, comment: "" });
      toast.success("Review submitted!");
    } catch {
      toast.error("Failed to submit review.");
    }
  };

  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const [selectedSize, setSelectedSize] = useState<string | undefined>();
  type ColorOption = NonNullable<Product["colors"]>[number];
  const [selectedColor, setSelectedColor] = useState<ColorOption>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const reviewsRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="text-center text-[var(--primary-orange)] py-20">
        Product not found.
      </div>
    );
  }

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
        product.reviews.length
      : 0;

  const currentImages = selectedColor?.images?.length
    ? selectedColor.images
    : product.images;

  const handleAdd = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast.error("Please select a color.");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      image:
        selectedColor?.images?.[selectedImageIndex] ??
        product.images[selectedImageIndex],
      price: product.price,
      quantity: 1,
      size: selectedSize,
      color: selectedColor?.value,
      colorName: selectedColor?.name,
    });

    toast.success(`${product.name} added to cart!`);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            stroke="currentColor"
          />
        ))}
        {hasHalf && (
          <StarHalf
            key="half"
            className="w-5 h-5 text-yellow-500"
            fill="currentColor"
            stroke="currentColor"
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarEmpty
            key={`empty-${i}`}
            className="w-5 h-5 text-yellow-500"
            fill="none"
            stroke="currentColor"
          />
        ))}
      </>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-white text-gray-900">
      {/* Top section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image gallery */}
        <div className="flex-1">
          <div className="overflow-hidden rounded shadow group">
            <img
              src={currentImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-96 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex mt-4 gap-2 overflow-x-auto">
            {currentImages.map((img: string, idx: number) => (
              <img
                key={idx}
                src={img}
                onClick={() => setSelectedImageIndex(idx)}
                className={`h-16 w-16 object-cover rounded border cursor-pointer ${
                  selectedImageIndex === idx
                    ? "border-orange-500"
                    : "border-gray-300"
                }`}
                alt="Thumbnail"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold text-[var(--primary-orange)]">
              {product.name}
            </h1>
            <button
              onClick={() => toggleWishlist(product.id)}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="text-gray-500 hover:text-red-500"
            >
              {isWishlisted ? (
                <Heart className="w-6 h-6 text-red-500" fill="currentColor" />
              ) : (
                <HeartOff className="w-6 h-6" />
              )}
            </button>
          </div>

          <p className="text-2xl font-bold text-gray-800 mb-2">
            EGP {product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-2 mb-4">
            {renderStars(averageRating)}
            <span className="text-sm text-gray-600 ml-1">
              {averageRating.toFixed(1)}/5
            </span>
            <button
              onClick={() =>
                reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-sm text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
            >
              ({product.reviews.length} verified ratings)
            </button>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-2">VARIATION AVAILABLE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 rounded text-sm ${
                      selectedSize === size
                        ? "bg-orange-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <p className="font-semibold mb-2">COLOR OPTIONS</p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedImageIndex(0);
                    }}
                    style={{ backgroundColor: color.value }}
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor?.name === color.name
                        ? "border-orange-500"
                        : "border-gray-300"
                    }`}
                    title={color.name}
                  ></button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleAdd}
            className="bg-[var(--primary-orange)] hover:bg-[var(--primary-amber)] text-white w-full px-6 py-3 mt-4 rounded transition"
          >
            Add to cart 🛒
          </button>
        </div>
      </div>

      {/* Product description */}
      <div className="mt-12 border rounded p-4 bg-gray-50">
        <h2 className="text-xl font-bold mb-2">Product details</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>

      {/* Reviews */}
      <div
        ref={reviewsRef}
        className="mt-12 border rounded p-4 bg-gray-50 scroll-mt-20"
      >
        <h2 className="text-xl font-bold mb-4">Verified Customer Feedback</h2>

        {/* Display Reviews */}
        <ul className="space-y-4">
          {product.reviews.map((r, idx) => (
            <li key={idx} className="bg-white border rounded p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < r.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    fill={i < r.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <p className="text-gray-800 mb-1">{r.comment}</p>
              <p className="text-xs text-gray-500">
                {r.date} by {r.name || "Anonymous"}
              </p>
            </li>
          ))}
        </ul>

        {/* Submit Review Form */}
        <form onSubmit={handleReviewSubmit} className="space-y-4 my-10">
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Rating
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= newReview.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                    fill={star <= newReview.rating ? "currentColor" : "none"}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Comment
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Share your thoughts about this product..."
            />
          </div>
          <button
            type="submit"
            className="bg-[var(--primary-orange)] text-white px-4 py-2 rounded hover:bg-[var(--primary-amber)]"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
