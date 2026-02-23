import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount, wishlistCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-orange-500 text-white text-xs py-1 text-center">
        <p>Free Delivery on Orders Above ₹500 | 100% Genuine Products</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">Sparible</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                data-testid="search-input"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/wishlist" className="relative" data-testid="wishlist-icon">
              <Heart className="text-gray-700 hover:text-orange-500" size={24} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative" data-testid="cart-icon">
              <ShoppingCart className="text-gray-700 hover:text-orange-500" size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2" data-testid="user-menu">
                  <User className="text-gray-700" size={24} />
                  <span className="hidden lg:block text-sm">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                  <Link to="/account" className="block px-4 py-2 hover:bg-gray-100" data-testid="my-account-link">My Account</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100" data-testid="my-orders-link">My Orders</Link>
                  {user.is_admin && (
                    <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100" data-testid="admin-link">Admin Panel</Link>
                  )}
                  <button onClick={logout} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600" data-testid="logout-button">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-600" data-testid="login-button">
                Login
              </Link>
            )}

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 border-t hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-3 text-sm">
            <li><Link to="/" className="hover:text-orange-500" data-testid="nav-home">Home</Link></li>
            <li><Link to="/products?category=Battery" className="hover:text-orange-500">Batteries</Link></li>
            <li><Link to="/products?category=Display & Screens" className="hover:text-orange-500">Displays</Link></li>
            <li><Link to="/products?category=Body & Housings" className="hover:text-orange-500">Body Parts</Link></li>
            <li><Link to="/products?type=laptop" className="hover:text-orange-500">Laptop Parts</Link></li>
            <li><Link to="/blog" className="hover:text-orange-500">Blog</Link></li>
            <li><Link to="/about" className="hover:text-orange-500">About Us</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-3">
              <li><Link to="/" className="block hover:text-orange-500" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
              <li><Link to="/products?category=Battery" className="block hover:text-orange-500" onClick={() => setMobileMenuOpen(false)}>Batteries</Link></li>
              <li><Link to="/products?category=Display & Screens" className="block hover:text-orange-500" onClick={() => setMobileMenuOpen(false)}>Displays</Link></li>
              <li><Link to="/products?category=Body & Housings" className="block hover:text-orange-500" onClick={() => setMobileMenuOpen(false)}>Body Parts</Link></li>
              <li><Link to="/products?type=laptop" className="block hover:text-orange-500" onClick={() => setMobileMenuOpen(false)}>Laptop Parts</Link></li>
              <li><Link to="/blog" className="block hover:text-orange-500" onClick={() => setMobileMenuOpen(false)}>Blog</Link></li>
              <li><Link to="/about" className="block hover:text-orange-500" onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;