import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, RotateCcw, Award, Star, Clock, ChevronDown, Mail, Percent, FileText, Zap, RefreshCw } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://web-constructor-50.preview.emergentagent.com';
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, brandRes, prodRes, blogRes] = await Promise.all([
        axios.get(`${API}/categories`),
        axios.get(`${API}/brands`),
        axios.get(`${API}/products?limit=12`),
        axios.get(`${API}/blogs?limit=3`)
      ]);
      setCategories(catRes.data);
      setBrands(brandRes.data);
      setProducts(prodRes.data);
      setBlogs(blogRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for subscribing with ${email}!`);
    setEmail('');
  };

  const mobileCategories = categories.filter(c => c.type === 'mobile').slice(0, 6);
  const mobileBrands = brands.filter(b => b.type === 'mobile').slice(0, 8);
  const dealOfDay = products[0];
  const featuredProducts = products.slice(1, 5);
  const popularProducts = products.slice(5, 9);

  const categoryData = [
    { name: 'Best Sellers', icon: '🏆', bg: 'from-yellow-500 to-orange-500', link: '/products' },
    { name: 'Battery', icon: '🔋', bg: 'from-green-500 to-teal-500', link: '/products?category=Battery' },
    { name: 'Display & Screens', icon: '📱', bg: 'from-blue-500 to-purple-500', link: '/products?category=Display & Screens' },
    { name: 'Camera', icon: '📷', bg: 'from-pink-500 to-rose-500', link: '/products?category=Camera' },
    { name: 'Charging Port', icon: '🔌', bg: 'from-indigo-500 to-blue-500', link: '/products?category=Charging Port' },
    { name: 'Laptop Parts', icon: '💻', bg: 'from-purple-500 to-pink-500', link: '/products?type=laptop' },
  ];

  const heroBanners = [
    {
      title: 'MEGA SALE',
      subtitle: 'GET UP TO',
      discount: '70% OFF',
      code: 'SPARE20',
      bg: 'from-red-600 via-orange-600 to-yellow-500',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800'
    },
    {
      title: 'PREMIUM PARTS',
      subtitle: 'FLAT',
      discount: '50% OFF',
      code: 'FIRST50',
      bg: 'from-purple-600 via-pink-600 to-red-500',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800'
    },
    {
      title: 'LAPTOP DEALS',
      subtitle: 'SAVE UP TO',
      discount: '60% OFF',
      code: 'LAPTOP60',
      bg: 'from-blue-600 via-indigo-600 to-purple-600',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800'
    }
  ];

  const reviews = [
    { name: 'Rahul M.', rating: 5, text: 'Excellent quality display! Works perfectly on my Samsung S21. Fast delivery too.', initial: 'R', color: 'bg-blue-500' },
    { name: 'Priya S.', rating: 5, text: 'Very happy with the battery replacement. Lasts much longer now. Highly recommended!', initial: 'P', color: 'bg-pink-500' },
    { name: 'Amit K.', rating: 4, text: 'Good product, proper packaging. Delivery was quick. Will order again.', initial: 'A', color: 'bg-green-500' },
  ];

  const faqs = [
    {
      q: 'Why choose Sparible for mobile spare parts?',
      a: 'We provide premium quality, tested spare parts with fast delivery, genuine products, and excellent customer support.'
    },
    {
      q: 'How fast is order processing and delivery?',
      a: 'Orders are processed within 24 hours and delivered within 3-5 business days across India with trusted courier partners.'
    },
    {
      q: 'Are Sparible mobile spare parts original or compatible?',
      a: 'We offer both OEM-grade and original quality spare parts that are 100% tested for quality and compatibility.'
    },
    {
      q: 'What is your return and exchange policy?',
      a: 'We offer easy 7-day return and exchange on defective products. Your satisfaction is our priority.'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0" data-testid="home-page">
      {/* Top Promotional Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 px-4 text-center text-sm font-medium">
        Get Extra 5% Off On Prepaid Orders | Code: <span className="font-bold">SPARIBLE5</span> | <Link to="/products" className="underline">Shop Now</Link>
      </div>

      {/* Category Icons - Boat Style */}
      <section className="bg-white py-4 border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categoryData.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className="flex-shrink-0 text-center"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cat.bg} flex items-center justify-center text-3xl mb-2 shadow-lg hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <p className="text-xs font-medium text-gray-700 w-20 leading-tight">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Banner - Boat Style Dramatic Design */}
      <section className="relative h-[400px] md:h-[500px] bg-black overflow-hidden">
        {heroBanners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover opacity-30"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${banner.bg} opacity-90`}></div>
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="text-white max-w-xl">
                <div className="mb-4">
                  <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
                    {banner.title} - LIVE NOW
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-4 drop-shadow-2xl">
                  {banner.subtitle}
                  <span className="block text-6xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
                    {banner.discount}
                  </span>
                </h1>
                <p className="text-xl mb-6 font-semibold">
                  Flat 5% off | Use Code: <span className="bg-white text-orange-600 px-3 py-1 rounded font-bold">{banner.code}</span>
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-2xl"
                >
                  SHOP NOW
                </Link>
                <p className="text-xs mt-4 opacity-80">*Only on prepaid orders</p>
              </div>

              {/* Product Images Showcase */}
              <div className="hidden lg:flex absolute right-10 bottom-10 gap-4">
                {products.slice(0, 3).map((product, idx) => (
                  <img
                    key={idx}
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-2xl shadow-2xl border-4 border-white/20"
                  />
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* USP Features - Boat Style */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="relative inline-block mb-2">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="text-orange-600" size={32} />
                </div>
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  12+3
                </span>
              </div>
              <h3 className="font-bold text-sm">Extended Warranty</h3>
              <p className="text-xs text-gray-600">12+3 Months</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-sm">GST Billing</h3>
              <p className="text-xs text-gray-600">On All Orders</p>
            </div>

            <div className="text-center">
              <div className="relative inline-block mb-2">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Truck className="text-orange-600" size={32} />
                </div>
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  FREE
                </span>
              </div>
              <h3 className="font-bold text-sm">Express Delivery</h3>
              <p className="text-xs text-gray-600">On Orders ₹500+</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <RefreshCw className="text-orange-600" size={32} />
              </div>
              <h3 className="font-bold text-sm">7-Day Replacement</h3>
              <p className="text-xs text-gray-600">Easy Returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      {dealOfDay && (
        <section className="py-8 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="text-orange-600" size={28} />
              <h2 className="text-2xl md:text-3xl font-black uppercase">Deal of the Day</h2>
            </div>
            <div className="max-w-xs mx-auto">
              <ProductCard product={dealOfDay} />
            </div>
          </div>
        </section>
      )}

      {/* Popular Products */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-black">Popular Products</h2>
            <Link to="/products" className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-6">Shop by Brand</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mobileBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.name}`}
                className="flex-shrink-0 w-32 bg-white border-2 border-gray-200 hover:border-orange-600 rounded-xl p-4 text-center transition-all shadow-sm hover:shadow-md"
              >
                <div className="font-bold text-lg mb-1">{brand.name}</div>
                <p className="text-xs text-orange-600 font-semibold">View Parts →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-6">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">What Our Customers Say</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
            {reviews.map((review, i) => (
              <div key={i} className="flex-shrink-0 w-80 md:w-auto bg-white rounded-xl p-5 border-2 border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 ${review.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-bold">{review.name}</p>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs - Accordion */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold hover:bg-gray-100 transition"
                >
                  {faq.q}
                  <ChevronDown
                    className={`transition-transform flex-shrink-0 ml-2 ${openFaq === index ? 'rotate-180' : ''}`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Mail className="mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-black mb-2">Subscribe to Our Newsletter</h2>
          <p className="mb-6 text-lg opacity-90">Get updates on new products and exclusive offers!</p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
