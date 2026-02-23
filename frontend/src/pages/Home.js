import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, RotateCcw, Award, Star, Clock, ChevronDown, Mail } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import HeroCarousel from '../components/HeroCarousel';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetchData();
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

  const categoryIcons = {
    'Battery': '🔋',
    'Display & Screens': '📱',
    'Body & Housings': '📦',
    'Charging Port': '🔌',
    'Camera': '📷',
    'Laptop Screen': '💻',
  };

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
      <div className=\"flex items-center justify-center min-h-screen\">
        <div className=\"animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600\"></div>
      </div>
    );
  }

  return (
    <div className=\"min-h-screen bg-gray-50 pb-16 md:pb-0\" data-testid=\"home-page\">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Trust Badges */}
      <section className=\"bg-white py-6 border-b\">
        <div className=\"container mx-auto px-4\">
          <div className=\"grid grid-cols-2 md:grid-cols-4 gap-4\">
            <div className=\"flex flex-col items-center text-center\">
              <div className=\"w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2\">
                <Shield className=\"text-orange-600\" size={24} />
              </div>
              <h3 className=\"font-semibold text-sm\">100% Secure</h3>
              <p className=\"text-xs text-gray-500\">Payment</p>
            </div>
            <div className=\"flex flex-col items-center text-center\">
              <div className=\"w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2\">
                <Truck className=\"text-orange-600\" size={24} />
              </div>
              <h3 className=\"font-semibold text-sm\">Fast Shipping</h3>
              <p className=\"text-xs text-gray-500\">3-5 Days</p>
            </div>
            <div className=\"flex flex-col items-center text-center\">
              <div className=\"w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2\">
                <RotateCcw className=\"text-orange-600\" size={24} />
              </div>
              <h3 className=\"font-semibold text-sm\">Easy Return</h3>
              <p className=\"text-xs text-gray-500\">7 Days</p>
            </div>
            <div className=\"flex flex-col items-center text-center\">
              <div className=\"w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2\">
                <Award className=\"text-orange-600\" size={24} />
              </div>
              <h3 className=\"font-semibold text-sm\">Premium Quality</h3>
              <p className=\"text-xs text-gray-500\">Tested</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deal of the Day */}
      {dealOfDay && (
        <section className=\"py-8 bg-gradient-to-r from-orange-50 to-orange-100\">
          <div className=\"container mx-auto px-4\">
            <div className=\"flex items-center justify-center gap-2 mb-4\">
              <Clock className=\"text-orange-600\" size={24} />
              <h2 className=\"text-2xl font-bold\">Deal of the Day</h2>
            </div>
            <div className=\"max-w-xs mx-auto\">
              <ProductCard product={dealOfDay} />
            </div>
          </div>
        </section>
      )}

      {/* Shop by Category */}
      <section className=\"py-8 bg-white\">
        <div className=\"container mx-auto px-4\">
          <div className=\"flex items-center justify-between mb-4\">
            <h2 className=\"text-xl md:text-2xl font-bold\">Shop by Category</h2>
            <Link to=\"/products\" className=\"text-orange-600 hover:text-orange-700 text-sm font-medium\">
              View All →
            </Link>
          </div>
          <div className=\"flex gap-3 overflow-x-auto pb-2 scrollbar-hide\">
            {mobileCategories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className=\"flex-shrink-0 w-24 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl p-4 text-center transition-all shadow-md hover:shadow-lg\"
                data-testid={`category-${category.id}`}
              >
                <div className=\"text-3xl mb-2\">{categoryIcons[category.name] || category.icon}</div>
                <h3 className=\"font-semibold text-xs leading-tight\">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className=\"py-8\">
        <div className=\"container mx-auto px-4\">
          <div className=\"flex items-center justify-between mb-4\">
            <h2 className=\"text-xl md:text-2xl font-bold\">Popular Products</h2>
            <Link to=\"/products\" className=\"text-orange-600 hover:text-orange-700 text-sm font-medium flex items-center gap-1\">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4\">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Brands */}
      <section className=\"py-8 bg-white\">
        <div className=\"container mx-auto px-4\">
          <h2 className=\"text-xl md:text-2xl font-bold mb-4\">Shop by Brand</h2>
          <div className=\"flex gap-3 overflow-x-auto pb-2 scrollbar-hide\">
            {mobileBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.name}`}
                className=\"flex-shrink-0 w-28 bg-white border-2 border-gray-200 hover:border-orange-600 rounded-lg p-4 text-center transition-all shadow-sm hover:shadow-md\"
                data-testid={`brand-${brand.id}`}
              >
                <div className=\"font-bold text-lg mb-1\">{brand.name}</div>
                <p className=\"text-xs text-orange-600\">View Parts →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className=\"py-8\">
        <div className=\"container mx-auto px-4\">
          <h2 className=\"text-xl md:text-2xl font-bold mb-4\">Featured Products</h2>
          <div className=\"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4\">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className=\"py-8 bg-white\">
        <div className=\"container mx-auto px-4\">
          <h2 className=\"text-xl md:text-2xl font-bold mb-6 text-center\">What Our Customers Say</h2>
          <div className=\"flex gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible\">
            {reviews.map((review, i) => (
              <div key={i} className=\"flex-shrink-0 w-80 md:w-auto bg-gray-50 rounded-lg p-5 border border-gray-200\">\n                <div className=\"flex items-center gap-3 mb-3\">\n                  <div className={`w-10 h-10 ${review.color} rounded-full flex items-center justify-center text-white font-bold`}>\n                    {review.initial}\n                  </div>\n                  <div>\n                    <p className=\"font-semibold\">{review.name}</p>\n                    <div className=\"flex\">\n                      {[...Array(review.rating)].map((_, i) => (\n                        <Star key={i} size={14} className=\"text-yellow-400 fill-yellow-400\" />\n                      ))}\n                    </div>\n                  </div>\n                </div>\n                <p className=\"text-sm text-gray-700\">{review.text}</p>\n              </div>\n            ))}\n          </div>\n        </div>\n      </section>\n\n      {/* FAQs - Accordion */}\n      <section className=\"py-8\">\n        <div className=\"container mx-auto px-4\">\n          <h2 className=\"text-xl md:text-2xl font-bold mb-6 text-center\">Frequently Asked Questions</h2>\n          <div className=\"max-w-3xl mx-auto space-y-3\">\n            {faqs.map((faq, index) => (\n              <div key={index} className=\"bg-white rounded-lg border border-gray-200 overflow-hidden\">\n                <button\n                  onClick={() => setOpenFaq(openFaq === index ? null : index)}\n                  className=\"w-full flex items-center justify-between p-4 text-left font-semibold hover:bg-gray-50 transition\"\n                >\n                  {faq.q}\n                  <ChevronDown\n                    className={`transition-transform ${openFaq === index ? 'rotate-180' : ''}`}\n                    size={20}\n                  />\n                </button>\n                {openFaq === index && (\n                  <div className=\"px-4 pb-4 text-sm text-gray-600\">\n                    {faq.a}\n                  </div>\n                )}\n              </div>\n            ))}\n          </div>\n        </div>\n      </section>\n\n      {/* Newsletter Signup */}\n      <section className=\"py-12 bg-gradient-to-r from-orange-600 to-orange-700 text-white\">\n        <div className=\"container mx-auto px-4 text-center\">\n          <Mail className=\"mx-auto mb-4\" size={40} />\n          <h2 className=\"text-2xl font-bold mb-2\">Subscribe to Our Newsletter</h2>\n          <p className=\"mb-6 opacity-90\">Get updates on new products and exclusive offers!</p>\n          <form onSubmit={handleNewsletterSubmit} className=\"max-w-md mx-auto flex gap-2\">\n            <input\n              type=\"email\"\n              required\n              value={email}\n              onChange={(e) => setEmail(e.target.value)}\n              placeholder=\"Enter your email\"\n              className=\"flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none\"\n            />\n            <button\n              type=\"submit\"\n              className=\"bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition\"\n            >\n              Subscribe\n            </button>\n          </form>\n        </div>\n      </section>\n\n      {/* App Download Banner */}\n      <section className=\"py-8 bg-white\">\n        <div className=\"container mx-auto px-4\">\n          <div className=\"bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center\">\n            <h2 className=\"text-2xl font-bold mb-2\">Download Sparible App</h2>\n            <p className=\"mb-6 opacity-90\">Shop on the go with our mobile app</p>\n            <div className=\"flex flex-col sm:flex-row gap-3 justify-center\">\n              <button className=\"bg-black hover:bg-gray-900 px-6 py-3 rounded-lg font-medium transition\">\n                📱 Get it on Google Play\n              </button>\n              <button className=\"bg-black hover:bg-gray-900 px-6 py-3 rounded-lg font-medium transition\">\n                🍎 Download on App Store\n              </button>\n            </div>\n          </div>\n        </div>\n      </section>\n    </div>\n  );\n};\n\nexport default Home;
