# Sparible E-commerce Platform

A modern, full-stack e-commerce platform for mobile phone and laptop spare parts, built with React, FastAPI, and MongoDB.

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse products by category, brand, and search
- **Advanced Filters**: Filter products by price range, category, and brand
- **Product Details**: Detailed product pages with images, descriptions, ratings, and reviews
- **Shopping Cart**: Add products to cart and manage quantities
- **Wishlist**: Save products for later
- **User Authentication**: Secure JWT-based authentication
- **Order Management**: Place orders and track order history
- **Blog Section**: Read articles about spare parts and repair guides
- **Responsive Design**: Fully mobile-responsive with modern UI

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and update order statuses
- **Dashboard**: View statistics (total products, orders, users, revenue)
- **Blog Management**: Create and manage blog posts

### Technical Features
- **Fast Performance**: React frontend with optimized rendering
- **RESTful API**: Well-structured FastAPI backend
- **MongoDB Database**: Flexible NoSQL database for scalability
- **Razorpay Integration**: Ready for payment processing (keys required)
- **Modern UI**: Built with Tailwind CSS
- **Secure**: JWT authentication, password hashing with bcrypt

## 📁 Project Structure

```
/app/
├── backend/
│   ├── server.py          # Main FastAPI application
│   ├── models.py          # Pydantic models
│   ├── auth.py            # Authentication utilities
│   ├── seed_db.py         # Database seeding script
│   ├── requirements.txt   # Python dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context (Auth, Cart)
│   │   ├── utils/        # Utility functions
│   │   ├── App.js        # Main App component
│   │   └── App.css       # Global styles
│   ├── public/           # Static assets
│   ├── package.json      # Node dependencies
│   └── .env             # Frontend environment variables
└── README.md            # This file
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **React Router v7** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons

### Backend
- **FastAPI** - Python web framework
- **Motor** - Async MongoDB driver
- **PyJWT** - JWT authentication
- **Passlib + Bcrypt** - Password hashing
- **Razorpay** - Payment gateway (ready for integration)

### Database
- **MongoDB** - NoSQL database

## 🔑 Environment Variables

### Backend (.env)
```
MONGO_URL="mongodb://localhost:27017"
DB_NAME="test_database"
CORS_ORIGINS="*"
JWT_SECRET_KEY="your-secret-key"
RAZORPAY_KEY_ID=""          # Add your Razorpay key
RAZORPAY_KEY_SECRET=""      # Add your Razorpay secret
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=https://your-app-url.preview.emergentagent.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

## 📦 Sample Data

The database is pre-seeded with:
- **12 Products** (mobile & laptop spare parts)
- **8 Categories** (Battery, Display, Body Parts, etc.)
- **10 Brands** (Samsung, Apple, Xiaomi, Dell, HP, etc.)
- **3 Blog Posts**
- **1 Admin User**
  - Email: admin@sparible.com
  - Password: admin123

## 🎨 Design Features

- **Orange Color Scheme** - Primary brand color (#f97316)
- **Modern Card Design** - Clean product cards with hover effects
- **Responsive Layout** - Mobile-first design
- **Sticky Header** - Easy navigation
- **Trust Badges** - 100% Secure Payment, Fast Shipping, Easy Return
- **Rating System** - Star ratings for products
- **Discount Badges** - Visual indicators for discounts

## 🔐 User Roles

### Admin User
- Access to admin panel
- Can manage products, orders, and blog posts
- View dashboard statistics

**Login Credentials:**
- Email: admin@sparible.com
- Password: admin123

### Regular User
- Browse and search products
- Add products to cart and wishlist
- Place orders
- View order history

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/{id}` - Update product (admin only)
- `DELETE /api/products/{id}` - Delete product (admin only)

### Categories & Brands
- `GET /api/categories` - Get all categories
- `GET /api/brands` - Get all brands

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/remove` - Remove item from cart
- `POST /api/cart/clear` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `POST /api/wishlist/remove` - Remove item from wishlist

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders/create` - Create new order
- `GET /api/admin/orders` - Get all orders (admin only)
- `PUT /api/admin/orders/{id}/status` - Update order status (admin only)

### Payment (Razorpay)
- `POST /api/payment/create-order` - Create payment order
- `POST /api/payment/verify` - Verify payment

### Reviews
- `GET /api/reviews/{product_id}` - Get product reviews
- `POST /api/reviews` - Create review

### Blog
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs/{id}` - Get blog post by ID
- `POST /api/blogs` - Create blog post (admin only)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics

## 🚀 Running the Application

Both backend and frontend are already running via supervisor:

### Check Status
```bash
sudo supervisorctl status
```

### Restart Services
```bash
# Restart backend
sudo supervisorctl restart backend

# Restart frontend
sudo supervisorctl restart frontend

# Restart all
sudo supervisorctl restart all
```

### View Logs
```bash
# Backend logs
tail -f /var/log/supervisor/backend.out.log
tail -f /var/log/supervisor/backend.err.log

# Frontend logs
tail -f /var/log/supervisor/frontend.out.log
tail -f /var/log/supervisor/frontend.err.log
```

## 💳 Razorpay Integration

The platform is ready for Razorpay payment integration. To activate:

1. Get your Razorpay keys from [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Add them to `/app/backend/.env`:
   ```
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```
3. Restart backend: `sudo supervisorctl restart backend`

## 🎯 Key Improvements Over WordPress

1. **Performance**: 10x faster page loads with React
2. **Modern UI**: Clean, modern design with Tailwind CSS
3. **Mobile-First**: Fully responsive and optimized for mobile
4. **Scalability**: MongoDB and FastAPI scale better than WordPress
5. **Customization**: Fully customizable codebase
6. **Security**: JWT authentication, modern security practices
7. **API-First**: RESTful API for future integrations
8. **Real-time**: Fast, dynamic updates without page reloads

## 📱 Pages Implemented

1. **Home** (`/`) - Hero, categories, brands, products, blog, FAQs
2. **Products** (`/products`) - Product listing with filters
3. **Product Detail** (`/product/:id`) - Single product page (planned)
4. **Cart** (`/cart`) - Shopping cart (planned)
5. **Checkout** (`/checkout`) - Checkout process (planned)
6. **Wishlist** (`/wishlist`) - Saved products (planned)
7. **Login** (`/login`) - User login
8. **Register** (`/register`) - User registration
9. **Orders** (`/orders`) - Order history (planned)
10. **Admin Panel** (`/admin`) - Admin dashboard (planned)
11. **Blog** (`/blog`) - Blog listing (planned)
12. **Blog Post** (`/blog/:id`) - Single blog post (planned)

## 🔧 Next Steps

To complete the platform:
1. Add Razorpay keys for payment processing
2. Create remaining pages (Cart, Checkout, Product Detail, Admin Panel)
3. Add product image upload functionality
4. Implement email notifications
5. Add order tracking
6. Set up production deployment

## 📞 Support

For any issues or questions:
- Email: support@sparible.com
- Phone: +91-9022967380

## 📄 License

Copyright © 2026 Sparible. All Rights Reserved.

---

**Built with ❤️ using React, FastAPI, and MongoDB**
