import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, wishlist } = useCart();
  const { user } = useAuth();
  const isInWishlist = wishlist.items?.includes(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product.id);
  };

  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-orange-50 transition ${
            isInWishlist ? 'text-red-500' : 'text-gray-600'
          }`}
          data-testid={`wishlist-btn-${product.id}`}
        >
          <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Brand */}
        <div className="text-xs text-gray-500 mb-1">
          {product.category} • {product.brand}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={star <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews_count})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          {product.discount_price ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-orange-500" data-testid={`product-price-${product.id}`}>
                ₹{product.discount_price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-orange-500" data-testid={`product-price-${product.id}`}>
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
          data-testid={`add-to-cart-${product.id}`}
        >
          <ShoppingCart size={18} />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
