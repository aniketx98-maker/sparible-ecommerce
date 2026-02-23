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

  const mobileBrands = brands.filter(b => b.type === 'mobile').slice(0, 8);
  const featuredProducts = products.slice(0, 8);
  const popularProducts = products.slice(0, 4);

  const categoryData = [
    { name: 'Best Sellers', icon: '🏆', bg: 'from-amber-400 to-orange-500', link: '/products' },
    { name: 'Battery', icon: '🔋', bg: 'from-blue-400 to-cyan-500', link: '/products?category=Battery' },
    { name: 'Display & Screens', icon: '📱', bg: 'from-purple-400 to-pink-500', link: '/products?category=Display & Screens' },
    { name: 'Camera', icon: '📷', bg: 'from-pink-400 to-rose-500', link: '/products?category=Camera' },
    { name: 'Charging Port', icon: '🔌', bg: 'from-indigo-400 to-blue-500', link: '/products?category=Charging Port' },
    { name: 'Laptop Parts', icon: '💻', bg: 'from-violet-400 to-purple-500', link: '/products?type=laptop' },
  ];

  const heroBanners = [
    {
      title: 'MEGA SALE',
      subtitle: 'GET UP TO',
      discount: '70% OFF',
      code: 'SPARE20',
      bg: 'from-orange-500 via-red-500 to-pink-500',
      image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800'
    },
    {
      title: 'PREMIUM PARTS',
      subtitle: 'FLAT',
      discount: '50% OFF',
      code: 'FIRST50',
      bg: 'from-purple-500 via-pink-500 to-rose-500',
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800'
    },
    {
      title: 'LAPTOP DEALS',
      subtitle: 'SAVE UP TO',
      discount: '60% OFF',
      code: 'LAPTOP60',
      bg: 'from-blue-500 via-indigo-500 to-purple-500',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800'
    }
  ];

  const reviews = [
    { name: 'Rahul M.', rating: 5, text: 'Excellent quality display! Works perfectly on my Samsung S21. Fast delivery too.', initial: 'R', color: 'bg-blue-500' },
    { name: 'Priya S.', rating: 5, text: 'Very happy with the battery replacement. Lasts much longer now. Highly recommended!', initial: 'P', color: 'bg-pink-500' },
    { name: 'Amit K.', rating: 4, text: 'Good product, proper packaging. Delivery was quick. Will order again.', initial: 'A', color: 'bg-indigo-500' },
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 pb-16 md:pb-0" data-testid="home-page">
      {/* Category Icons with Glassmorphism */}
      <section className="bg-white/80 backdrop-blur-md py-6 border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categoryData.map((cat, idx) => (
              <Link
                key={idx}
                to={cat.link}
                className="flex-shrink-0 text-center group"
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${cat.bg} flex items-center justify-center text-4xl mb-2 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
                  <span className="relative z-10">{cat.icon}</span>
                </div>
                <p className="text-xs font-bold text-gray-700 w-20 leading-tight group-hover:text-orange-600 transition-colors">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Banner with Premium Glassmorphism */}
      <section className="relative h-[450px] md:h-[550px] overflow-hidden">
        {heroBanners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background with Mesh Gradient */}
            <div className="absolute inset-0">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${banner.bg} opacity-90`}></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
            </div>

            {/* Content with Glassmorphism */}
            <div className="relative h-full container mx-auto px-4 flex items-center">
              <div className="text-white max-w-2xl">
                {/* Badge with glass effect */}
                <div className="mb-6 inline-block">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full">
                    <span className="text-sm font-black uppercase tracking-wider drop-shadow-lg">
                      ✨ {banner.title} - LIVE NOW
                    </span>
                  </div>
                </div>

                {/* Main Discount Display */}
                <div className="mb-6">
                  <h1 className="text-5xl md:text-7xl font-black mb-2 drop-shadow-2xl">
                    {banner.subtitle}
                  </h1>
                  <div className="relative inline-block">
                    <span className="block text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-yellow-200 drop-shadow-2xl">
                      {banner.discount}
                    </span>
                    <div className="absolute inset-0 blur-3xl bg-white/30"></div>
                  </div>
                </div>

                {/* Code Badge with glass */}
                <div className="mb-8">
                  <p className="text-xl mb-3 font-bold drop-shadow-lg">
                    Flat 5% off | Use Code:
                  </p>
                  <div className="inline-block bg-white/95 backdrop-blur-sm text-orange-600 px-6 py-3 rounded-xl font-black text-2xl shadow-2xl border-2 border-white/50">
                    {banner.code}
                  </div>
                </div>

                {/* CTA Button with glass */}
                <Link
                  to="/products"
                  className="inline-block bg-white/90 backdrop-blur-sm hover:bg-white text-orange-600 px-10 py-4 rounded-full font-black text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 hover:scale-105 border border-white/50"
                >
                  SHOP NOW →
                </Link>

                <p className="text-xs mt-4 opacity-80">*Only on prepaid orders</p>
              </div>

              {/* Floating Product Cards */}
              <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 gap-4 flex-col">
                {products.slice(0, 3).map((product, idx) => (
                  <div
                    key={idx}
                    className="w-40 bg-white/20 backdrop-blur-md rounded-2xl p-3 border border-white/30 shadow-2xl hover:scale-105 transition-transform"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-xl mb-2"
                    />
                    <p className="text-white text-xs font-bold line-clamp-2">{product.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators with glass */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all backdrop-blur-sm ${
                    idx === currentSlide 
                      ? 'bg-white w-10 shadow-lg' 
                      : 'bg-white/40 w-2 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* USP Features with Premium Cards */}
      <section className="py-10 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: 'Extended Warranty', desc: '12+3 Months', badge: '25% EXTRA', color: 'from-blue-500 to-cyan-500' },
              { icon: FileText, title: 'GST Billing', desc: 'On All Orders', color: 'from-purple-500 to-pink-500' },
              { icon: Truck, title: 'Express Delivery', desc: 'On Orders ₹500+', badge: 'FREE', color: 'from-orange-500 to-red-500' },
              { icon: RefreshCw, title: '7-Day Replacement', desc: 'Easy Returns', color: 'from-indigo-500 to-purple-500' }
            ].map((feature, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  {feature.badge && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg">
                      {feature.badge}
                    </div>
                  )}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className="font-black text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-600 font-semibold">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Popular Products
            </h2>
            <Link 
              to="/products" 
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-8 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Shop by Brand
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {mobileBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.name}`}
                className="flex-shrink-0 w-36 bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-orange-500 rounded-2xl p-6 text-center transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <div className="font-black text-xl mb-2 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  {brand.name}
                </div>
                <p className="text-xs text-orange-600 font-bold">View Parts →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <Link 
              to="/products" 
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2"
            >
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-gray-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Latest from Blog
              </h2>
              <Link to="/blog" className="text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1">
                View All <ChevronRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-lg mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{blog.excerpt}</p>
                    <span className="text-orange-600 text-sm font-bold">Read More →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Customer Reviews */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-center bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
            {reviews.map((review, i) => (
              <div key={i} className="flex-shrink-0 w-80 md:w-auto bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-14 h-14 ${review.color} rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg`}>
                    {review.initial}
                  </div>
                  <div>
                    <p className="font-black text-lg">{review.name}</p>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black mb-8 text-center bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-black hover:bg-orange-50 transition"
                >
                  {faq.q}
                  <ChevronDown
                    className={`transition-transform flex-shrink-0 ml-2 text-orange-600 ${openFaq === index ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <Mail className="mx-auto mb-6" size={56} />
            <h2 className="text-4xl font-black mb-3">Subscribe to Our Newsletter</h2>
            <p className="mb-8 text-lg opacity-95">Get updates on new products and exclusive offers!</p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50 font-semibold"
              />
              <button
                type="submit"
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-black hover:bg-gray-100 transition shadow-2xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
