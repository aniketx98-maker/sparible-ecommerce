import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const categories = [
  { name: 'Battery', path: '/products?category=Battery' },
  { name: 'Display & Screens', path: '/products?category=Display & Screens' },
  { name: 'Back Panel', path: '/products?category=Body & Housings' },
  { name: 'Camera', path: '/products?category=Camera' },
  { name: 'Charging Port', path: '/products?category=Charging Port' },
  { name: 'Speaker', path: '/products?category=Speaker' },
  { name: 'Laptop Parts', path: '/products?type=laptop' },
];

const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount, wishlistCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Bar - Free Delivery Message */}
      <div className="bg-orange-600 text-white text-xs py-2 text-center">
        <p className="font-medium">🎉 Free Delivery on Orders Above ₹500 | 100% Genuine Products</p>
      </div>

      {/* Main Header */}
      <header
        className={`bg-white sticky top-0 z-50 transition-shadow ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className=\"container mx-auto px-4 py-3\">
          <div className=\"flex items-center justify-between gap-3\">
            {/* Logo */}
            <Link to=\"/\" className=\"flex items-center gap-2 flex-shrink-0\">
              <div className=\"w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center\">
                <span className=\"text-white font-bold text-xl\">S</span>
              </div>
              <span className=\"text-xl font-bold text-gray-800 hidden sm:block\">
                Sparible
              </span>
            </Link>

            {/* Search Bar - Inline */}
            <form onSubmit={handleSearch} className=\"flex-1 max-w-2xl hidden md:block\">
              <div className=\"relative\">
                <input
                  type=\"text\"
                  placeholder=\"Search for products...\"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className=\"w-full px-4 py-2.5 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent\"
                  data-testid=\"search-input\"
                />
                <Search className=\"absolute left-3 top-3 text-gray-400\" size={20} />
              </div>
            </form>

            {/* Right Icons */}
            <div className=\"flex items-center gap-3 md:gap-4\">
              {/* Wishlist Icon with Badge */}
              <Link
                to=\"/wishlist\"
                className=\"relative p-2 hover:bg-gray-100 rounded-lg transition\"
                data-testid=\"wishlist-icon\"
              >
                <Heart className=\"text-gray-700\" size={24} />
                {wishlistCount > 0 && (
                  <span className=\"absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold\">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon with Badge */}
              <Link
                to=\"/cart\"
                className=\"relative p-2 hover:bg-gray-100 rounded-lg transition\"
                data-testid=\"cart-icon\"
              >
                <ShoppingCart className=\"text-gray-700\" size={24} />
                {cartCount > 0 && (
                  <span className=\"absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold\">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              {user ? (
                <div className=\"relative group hidden md:block\">
                  <button
                    className=\"flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition\"
                    data-testid=\"user-menu\"
                  >
                    <User className=\"text-gray-700\" size={24} />
                    <span className=\"text-sm font-medium hidden lg:block\">
                      {user.name.split(' ')[0]}
                    </span>
                  </button>
                  <div className=\"absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg hidden group-hover:block\">
                    <Link
                      to=\"/account\"
                      className=\"block px-4 py-2.5 hover:bg-gray-100 text-sm\"
                      data-testid=\"my-account-link\"
                    >
                      My Account
                    </Link>
                    <Link
                      to=\"/orders\"
                      className=\"block px-4 py-2.5 hover:bg-gray-100 text-sm\"
                      data-testid=\"my-orders-link\"
                    >
                      My Orders
                    </Link>
                    {user.is_admin && (
                      <Link
                        to=\"/admin\"
                        className=\"block px-4 py-2.5 hover:bg-gray-100 text-sm\"
                        data-testid=\"admin-link\"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className=\"w-full text-left px-4 py-2.5 hover:bg-gray-100 text-red-600 text-sm\"
                      data-testid=\"logout-button\"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to=\"/login\"
                  className=\"bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition hidden md:block\"
                  data-testid=\"login-button\"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className=\"md:hidden p-2\"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className=\"mt-3 md:hidden\">
            <div className=\"relative\">
              <input
                type=\"text\"
                placeholder=\"Search for products...\"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=\"w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500\"
              />
              <Search className=\"absolute left-3 top-2.5 text-gray-400\" size={20} />
            </div>
          </form>
        </div>

        {/* Category Pills Bar - Horizontally Scrollable */}
        <div className="border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="px-4 py-2 bg-gray-100 hover:bg-orange-100 hover:text-orange-600 rounded-full text-sm font-medium whitespace-nowrap transition"
                  data-testid={`category-pill-${category.name}`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className=\"md:hidden bg-white border-t\">
            <nav className=\"container mx-auto px-4 py-4\">
              <ul className=\"space-y-3\">
                {user ? (
                  <>
                    <li>
                      <Link
                        to=\"/account\"
                        className=\"block text-gray-700 font-medium\"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link
                        to=\"/orders\"
                        className=\"block text-gray-700 font-medium\"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                    </li>
                    {user.is_admin && (
                      <li>
                        <Link
                          to=\"/admin\"
                          className=\"block text-gray-700 font-medium\"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className=\"text-red-600 font-medium\"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link
                      to=\"/login\"
                      className=\"block bg-orange-600 text-white text-center py-2 rounded-lg font-medium\"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Header;
