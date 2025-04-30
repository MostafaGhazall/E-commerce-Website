import { CartItemProps } from "../types/CartItem";

export default function CartItem({
  name,
  image,
  price,
  quantity,
  size,
  color,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded mr-4"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>

        {/* Show size if available */}
        {size && (
          <p className="text-sm text-gray-500 mt-1">
            Size: <span className="font-medium">{size}</span>
          </p>
        )}

        {/* Show color if available */}
        {color && (
          <p className="text-sm text-gray-500 mt-1">
            Color: <span className="font-medium">{color}</span>
          </p>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center mt-2 space-x-2">
          <button
            onClick={onDecrease}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="px-2">{quantity}</span>
          <button
            onClick={onIncrease}
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Total & Remove */}
      <div className="text-right">
        <p className="text-gray-700 font-medium">
          ${(price * quantity).toFixed(2)}
        </p>
        <button
          onClick={onRemove}
          className="text-red-500 text-sm mt-2 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
