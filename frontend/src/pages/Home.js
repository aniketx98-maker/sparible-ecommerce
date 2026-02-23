import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, RotateCcw, Award, Star } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const mobileCategories = categories.filter(c => c.type === 'mobile');
  const mobileBrands = brands.filter(b => b.type === 'mobile');
  const featuredProducts = products.slice(0, 4);
  const popularProducts = products.slice(4, 8);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="home-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="hero-title">
              A Complete Mobile & Laptop Repair Solution
            </h1>
            <p className="text-lg mb-6 opacity-90">
              Premium quality spare parts for all your mobile and laptop repair needs. Fast delivery, genuine products, 100% tested.
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              data-testid="shop-now-button"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <Shield className="text-orange-500 mb-2" size={32} />
              <h3 className="font-semibold text-sm">100% Secure Payment</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <Truck className="text-orange-500 mb-2" size={32} />
              <h3 className="font-semibold text-sm">Free & Fast Shipping</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="text-orange-500 mb-2" size={32} />
              <h3 className="font-semibold text-sm">Easy Return</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award className="text-orange-500 mb-2" size={32} />
              <h3 className="font-semibold text-sm">Premium Quality</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mobileCategories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition"
                data-testid={`category-${category.id}`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Products</h2>
            <Link to="/products" className="text-orange-500 hover:text-orange-600 flex items-center gap-1">
              View All <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Brands */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Select Mobile Phone Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mobileBrands.map((brand) => (
              <Link
                key={brand.id}
                to={`/products?brand=${brand.name}`}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition text-center"
                data-testid={`brand-${brand.id}`}
              >
                <div className="font-semibold mb-2">{brand.name}</div>
                <p className="text-sm text-orange-500">{brand.name} Spare Parts →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Laptop Parts Banner */}
      <section className="py-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Parts that fit perfectly with your laptop devices</h2>
          <p className="mb-6 text-lg opacity-90">Browse our extensive collection of laptop spare parts</p>
          <Link 
            to="/products?type=laptop" 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Explore Laptop Parts
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      {blogs.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Our Blogs</h2>
              <Link to="/blog" className="text-orange-500 hover:text-orange-600 flex items-center gap-1">
                View All <ChevronRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
                    <span className="text-orange-500 text-sm mt-2 inline-block">Read More →</span>
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
          <h2 className="text-2xl font-bold mb-6 text-center">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Excellent quality products and fast delivery. Very satisfied with my purchase!"
                </p>
                <p className="font-semibold">Customer {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">FAQs</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="bg-white rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer">Why choose Sparible for mobile spare parts?</summary>
              <p className="mt-2 text-gray-600">
                We provide premium quality, tested spare parts with fast delivery and excellent customer support.
              </p>
            </details>
            <details className="bg-white rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer">How fast is order processing and delivery?</summary>
              <p className="mt-2 text-gray-600">
                Orders are processed within 24 hours and delivered within 3-5 business days across India.
              </p>
            </details>
            <details className="bg-white rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer">Are Sparible mobile spare parts original or compatible?</summary>
              <p className="mt-2 text-gray-600">
                We offer both OEM-grade and original quality spare parts that are 100% tested for quality and compatibility.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
