import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold">Sparible</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted source for high-quality mobile and laptop spare parts. Fast delivery, genuine products, premium quality.
            </p>
            <div className="space-y-2">
              <a href="mailto:support@sparible.com" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                <Mail size={16} />
                support@sparible.com
              </a>
              <a href="tel:+919022967380" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                <Phone size={16} />
                +91-9022967380
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Return & Exchange Policy</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">Track Order</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white">All Products</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition">
                <Youtube size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">Stay connected for the latest updates and offers!</p>
          </div>
        </div>

        {/* Shipping Partners */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h3 className="text-sm font-semibold mb-4 text-center">Our Shipping Partners</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-500 text-sm">
            <span>FedEx</span>
            <span>DHL</span>
            <span>Blue Dart</span>
            <span>Delhivery</span>
            <span>Ekart</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Sparible. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;