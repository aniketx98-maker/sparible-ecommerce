import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useCart();
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);
  const isInWishlist = wishlist.items?.includes(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    toast.success('Added to cart ✓');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist ✓');
    }
  };

  const discountPercentage = product.discount_price 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-orange-500/50 hover:shadow-2xl transition-all duration-300 overflow-hidden group relative"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image Container */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <p className="text-xs text-gray-500">Sparible</p>
            </div>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        )}
        
        {/* Discount Badge - Top Left */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Wishlist Button - Top Right */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-1.5 rounded-full shadow-md transition-all ${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50'
          }`}
          data-testid={`wishlist-btn-${product.id}`}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Brand */}
        <div className="text-xs text-gray-500 mb-1 truncate">{product.brand}</div>

        {/* Name */}
        <h3 className="text-sm font-medium line-clamp-2 h-10 mb-2" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">
            {product.rating.toFixed(1)}
            <Star size={10} className="ml-0.5 fill-current" />
          </div>
          <span className="text-xs text-gray-500">({product.reviews_count})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-base font-bold text-gray-900" data-testid={`product-price-${product.id}`}>
            ₹{product.discount_price ? product.discount_price.toFixed(0) : product.price.toFixed(0)}
          </span>
          {product.discount_price && (
            <span className="text-xs text-gray-500 line-through">
              ₹{product.price.toFixed(0)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-1.5 ${
            product.stock === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-orange-600 text-white hover:bg-orange-700 active:scale-95'
          }`}
          data-testid={`add-to-cart-${product.id}`}
        >
          {product.stock === 0 ? (
            'Out of Stock'
          ) : (
            <>
              <Plus size={16} />
              Add
            </>
          )}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;