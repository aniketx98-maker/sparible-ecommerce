import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://web-constructor-50.preview.emergentagent.com';
const API = `${BACKEND_URL}/api`;

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [wishlist, setWishlist] = useState({ items: [] });
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (user && token) {
      fetchCart();
      fetchWishlist();
    }
  }, [user, token]);

  useEffect(() => {
    setCartCount(cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0);
  }, [cart]);

  useEffect(() => {
    setWishlistCount(wishlist.items?.length || 0);
  }, [wishlist]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`${API}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      await axios.post(`${API}/cart/add`, 
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post(`${API}/cart/remove?product_id=${productId}`, {},
        { headers: { Authorization: `Bearer ${token}` }}
      );
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.post(`${API}/cart/clear`, {},
        { headers: { Authorization: `Bearer ${token}` }}
      );
      await fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    try {
      await axios.post(`${API}/wishlist/add?product_id=${productId}`, {},
        { headers: { Authorization: `Bearer ${token}` }}
      );
      await fetchWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.post(`${API}/wishlist/remove?product_id=${productId}`, {},
        { headers: { Authorization: `Bearer ${token}` }}
      );
      await fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      cartCount,
      wishlistCount,
      addToCart,
      removeFromCart,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};