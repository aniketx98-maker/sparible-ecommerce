import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    search: searchParams.get('search') || '',
    min_price: searchParams.get('min_price') || '',
    max_price: searchParams.get('max_price') || '',
  });

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  useEffect(() => {
    applySorting();
  }, [sortBy, allProducts]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get(`${API}/brands`);
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(`${API}/products?${params.toString()}`);
      setAllProducts(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const applySorting = () => {
    let sorted = [...allProducts];
    switch (sortBy) {
      case 'price_asc':
        sorted.sort((a, b) => (a.discount_price || a.price) - (b.discount_price || b.price));
        break;
      case 'price_desc':
        sorted.sort((a, b) => (b.discount_price || b.price) - (a.discount_price || a.price));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      default:
        // relevance - keep original order
        break;
    }
    setProducts(sorted);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      search: '',
      min_price: '',
      max_price: '',
    });
    setSearchParams({});
  };

  const activeFiltersCount = Object.values(filters).filter(v => v).length;

  return (
    <div className=\"min-h-screen bg-gray-50 pb-16 md:pb-0\" data-testid=\"products-page\">
      <div className=\"container mx-auto px-4 py-6\">\n        {/* Header */}\n        <div className=\"flex items-center justify-between mb-6\">\n          <h1 className=\"text-2xl md:text-3xl font-bold\">All Products</h1>\n          <button\n            onClick={() => setShowFilters(!showFilters)}\n            className=\"lg:hidden bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium\"\n          >\n            <Filter size={20} />\n            Filters\n            {activeFiltersCount > 0 && (\n              <span className=\"bg-white text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold\">\n                {activeFiltersCount}\n              </span>\n            )}\n          </button>\n        </div>\n\n        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } lg:block fixed lg:static inset-0 lg:inset-auto z-50 lg:z-auto w-full lg:w-72 bg-white lg:rounded-lg p-6 lg:h-fit lg:sticky lg:top-24 overflow-y-auto`}
          >\n            <div className=\"flex items-center justify-between mb-4\">\n              <h2 className=\"text-lg font-bold flex items-center gap-2\">\n                <SlidersHorizontal size={20} />\n                Filters\n              </h2>\n              <div className=\"flex items-center gap-2\">\n                {activeFiltersCount > 0 && (\n                  <button\n                    onClick={clearFilters}\n                    className=\"text-sm text-orange-600 hover:text-orange-700 font-medium\"\n                  >\n                    Clear All\n                  </button>\n                )}\n                <button\n                  onClick={() => setShowFilters(false)}\n                  className=\"lg:hidden\"\n                >\n                  <X size={24} />\n                </button>\n              </div>\n            </div>\n\n            {/* Category Filter */}\n            <div className=\"mb-6 pb-6 border-b\">\n              <h3 className=\"font-semibold mb-3\">Category</h3>\n              <div className=\"space-y-2 max-h-48 overflow-y-auto\">\n                {categories.map((cat) => (\n                  <label key={cat.id} className=\"flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded\">\n                    <input\n                      type=\"radio\"\n                      name=\"category\"\n                      value={cat.name}\n                      checked={filters.category === cat.name}\n                      onChange={(e) => handleFilterChange('category', e.target.value)}\n                      className=\"text-orange-600 focus:ring-orange-500\"\n                    />\n                    <span className=\"text-sm\">{cat.name}</span>\n                  </label>\n                ))}\n              </div>\n            </div>\n\n            {/* Brand Filter */}\n            <div className=\"mb-6 pb-6 border-b\">\n              <h3 className=\"font-semibold mb-3\">Brand</h3>\n              <div className=\"space-y-2 max-h-48 overflow-y-auto\">\n                {brands.map((brand) => (\n                  <label key={brand.id} className=\"flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded\">\n                    <input\n                      type=\"radio\"\n                      name=\"brand\"\n                      value={brand.name}\n                      checked={filters.brand === brand.name}\n                      onChange={(e) => handleFilterChange('brand', e.target.value)}\n                      className=\"text-orange-600 focus:ring-orange-500\"\n                    />\n                    <span className=\"text-sm\">{brand.name}</span>\n                  </label>\n                ))}\n              </div>\n            </div>\n\n            {/* Price Filter */}\n            <div className=\"mb-6\">\n              <h3 className=\"font-semibold mb-3\">Price Range</h3>\n              <div className=\"space-y-3\">\n                <input\n                  type=\"number\"\n                  placeholder=\"Min Price\"\n                  value={filters.min_price}\n                  onChange={(e) => handleFilterChange('min_price', e.target.value)}\n                  className=\"w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent\"\n                />\n                <input\n                  type=\"number\"\n                  placeholder=\"Max Price\"\n                  value={filters.max_price}\n                  onChange={(e) => handleFilterChange('max_price', e.target.value)}\n                  className=\"w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent\"\n                />\n              </div>\n            </div>\n\n            <button\n              onClick={() => setShowFilters(false)}\n              className=\"lg:hidden w-full bg-orange-600 text-white py-3 rounded-lg font-semibold\"\n            >\n              Apply Filters\n            </button>\n          </aside>\n\n          {/* Products Grid */}\n          <main className=\"flex-1\">\n            {/* Sort & Results Bar */}\n            <div className=\"bg-white rounded-lg p-4 mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4\">\n              <p className=\"text-sm text-gray-600\">\n                Showing <span className=\"font-semibold\">{products.length}</span> of{' '}\n                <span className=\"font-semibold\">{allProducts.length}</span> products\n              </p>\n              <div className=\"flex items-center gap-2\">\n                <ArrowUpDown size={18} className=\"text-gray-600\" />\n                <select\n                  value={sortBy}\n                  onChange={(e) => setSortBy(e.target.value)}\n                  className=\"px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent\"\n                  data-testid=\"sort-select\"\n                >\n                  <option value=\"relevance\">Relevance</option>\n                  <option value=\"price_asc\">Price: Low to High</option>\n                  <option value=\"price_desc\">Price: High to Low</option>\n                  <option value=\"rating\">Top Rated</option>\n                  <option value=\"newest\">Newest First</option>\n                </select>\n              </div>\n            </div>\n\n            {/* Active Filters Tags */}\n            {activeFiltersCount > 0 && (\n              <div className=\"bg-white rounded-lg p-3 mb-4 flex flex-wrap items-center gap-2\">\n                <span className=\"text-sm font-semibold\">Active Filters:</span>\n                {filters.category && (\n                  <span className=\"bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-2\">\n                    {filters.category}\n                    <button onClick={() => handleFilterChange('category', '')}>\n                      <X size={14} />\n                    </button>\n                  </span>\n                )}\n                {filters.brand && (\n                  <span className=\"bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-2\">\n                    {filters.brand}\n                    <button onClick={() => handleFilterChange('brand', '')}>\n                      <X size={14} />\n                    </button>\n                  </span>\n                )}\n                {filters.search && (\n                  <span className=\"bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-2\">\n                    Search: {filters.search}\n                    <button onClick={() => handleFilterChange('search', '')}>\n                      <X size={14} />\n                    </button>\n                  </span>\n                )}\n              </div>\n            )}\n\n            {/* Products */}\n            {loading ? (\n              <div className=\"flex items-center justify-center py-20\">\n                <div className=\"animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600\"></div>\n              </div>\n            ) : products.length > 0 ? (\n              <div className=\"grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4\">\n                {products.map((product) => (\n                  <ProductCard key={product.id} product={product} />\n                ))}\n              </div>\n            ) : (\n              <div className=\"bg-white rounded-lg p-12 text-center\">\n                <p className=\"text-gray-600 mb-4\">No products found matching your filters.</p>\n                <button\n                  onClick={clearFilters}\n                  className=\"text-orange-600 hover:text-orange-700 font-semibold\"\n                >\n                  Clear Filters\n                </button>\n              </div>\n            )}\n          </main>\n        </div>\n      </div>\n    </div>\n  );\n};\n\nexport default Products;
