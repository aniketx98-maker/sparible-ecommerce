import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Cart = () => {
  const { user } = useAuth();
  const { cart, removeFromCart, fetchCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCartProducts();
  }, [cart, user]);

  const fetchCartProducts = async () => {
    if (!cart.items || cart.items.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const productPromises = cart.items.map(item =>
        axios.get(`${API}/products/${item.product_id}`)
      );
      const responses = await Promise.all(productPromises);
      const productsData = responses.map((res, index) => ({
        ...res.data,
        quantity: cart.items[index].quantity
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching cart products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    toast.success('Removed from cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    // Update cart quantity logic here
  };

  const subtotal = products.reduce((sum, product) => {
    const price = product.discount_price || product.price;
    return sum + (price * product.quantity);
  }, 0);

  const discount = products.reduce((sum, product) => {
    if (product.discount_price) {
      return sum + ((product.price - product.discount_price) * product.quantity);
    }
    return sum;
  }, 0);

  const deliveryCharge = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-20 md:pb-8" data-testid="cart-page">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <ShoppingBag className="mx-auto mb-4 text-gray-400" size={64} />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link
              to="/products"
              className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg p-4 flex gap-4 shadow-sm">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${product.id}`} className="font-semibold hover:text-orange-600 line-clamp-2">
                      {product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">{product.brand}</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold">
                        ₹{product.discount_price ? product.discount_price.toFixed(0) : product.price.toFixed(0)}
                      </span>
                      {product.discount_price && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.price.toFixed(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="text-red-600 hover:text-red-700 p-2"
                      data-testid={`remove-${product.id}`}
                    >
                      <Trash2 size={20} />
                    </button>
                    <div className="flex items-center gap-2 border rounded-lg">
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                        disabled={product.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold w-8 text-center">{product.quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-4">Price Details</h2>
                <div className="space-y-3 border-b pb-4 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price ({products.length} items)</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className={deliveryCharge === 0 ? 'text-green-600 font-semibold' : 'font-semibold'}>
                      {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  {subtotal < 500 && (
                    <p className="text-xs text-orange-600">Add ₹{(500 - subtotal).toFixed(2)} more for FREE delivery</p>
                  )}
                </div>
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <button
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  data-testid="checkout-button"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;