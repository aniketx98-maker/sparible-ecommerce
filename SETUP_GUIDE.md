# Sparible E-commerce Platform - Setup Guide

## 🚀 Quick Start

This is a complete e-commerce platform for mobile and laptop spare parts with premium glassmorphism design.

## 📦 What's Included

```
sparible-ecommerce/
├── backend/              # FastAPI backend
│   ├── server.py        # Main API server
│   ├── models.py        # Database models
│   ├── auth.py          # Authentication utilities
│   ├── seed_db.py       # Database seeding script
│   ├── requirements.txt # Python dependencies
│   └── .env             # Environment variables (update this!)
│
├── frontend/            # React frontend
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # React contexts
│   │   ├── pages/       # Page components
│   │   ├── utils/       # Utility functions
│   │   ├── App.js       # Main app
│   │   └── App.css      # Global styles
│   ├── package.json     # Node dependencies
│   ├── tailwind.config.js
│   └── .env             # Frontend environment (update this!)
│
└── README.md            # This file
```

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- MongoDB (local or Atlas)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Update .env file with your settings:
# - MONGO_URL (your MongoDB connection string)
# - RAZORPAY_KEY_ID (your Razorpay key)
# - RAZORPAY_KEY_SECRET (your Razorpay secret)
# - JWT_SECRET_KEY (create a strong secret)

# Seed the database (optional - creates sample data)
python seed_db.py

# Run the server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend will run at: http://localhost:8001

### Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install
# or
npm install

# Update .env file:
# - REACT_APP_BACKEND_URL=http://localhost:8001

# Run the development server
yarn start
# or
npm start
```

Frontend will run at: http://localhost:3000

## 🔑 Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=sparible_db
CORS_ORIGINS=*
JWT_SECRET_KEY=your-super-secret-key-change-this
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🎨 Features

- ✨ Premium glassmorphism design
- 🛒 Shopping cart & wishlist
- 💳 Razorpay payment integration
- 👤 JWT-based authentication
- 📱 Fully responsive mobile design
- ⚡ Fast React + FastAPI stack
- 🎯 Product filtering & search
- 📦 Order management
- ⭐ Product reviews & ratings
- 📝 Blog section
- 🔐 Secure backend APIs

## 📱 Tech Stack

### Frontend
- React 19
- Tailwind CSS
- React Router v7
- Axios
- React Hot Toast
- Lucide React Icons

### Backend
- FastAPI
- Motor (Async MongoDB)
- PyJWT
- Passlib + Bcrypt
- Razorpay SDK

### Database
- MongoDB

## 🎯 Default Admin Account

After seeding the database:
- Email: admin@sparible.com
- Password: admin123

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc

## 🚀 Deployment

### Backend Deployment
- Deploy to Heroku, Railway, or any Python hosting
- Set environment variables
- Use Gunicorn with Uvicorn workers

### Frontend Deployment
- Deploy to Vercel, Netlify, or any static hosting
- Build: `yarn build`
- Set REACT_APP_BACKEND_URL to your backend URL

### Database
- Use MongoDB Atlas for production
- Update MONGO_URL in backend .env

## 🔒 Security Notes

1. **Change all default secrets** in .env files
2. **Never commit .env files** to git
3. **Use environment variables** in production
4. **Enable HTTPS** in production
5. **Set proper CORS origins** (not *)

## 📝 Database Schema

### Collections
- users
- products
- categories
- brands
- carts
- wishlists
- orders
- reviews
- blogs

## 🆘 Troubleshooting

**Backend not starting?**
- Check MongoDB is running
- Verify .env file exists and has correct values
- Check all dependencies are installed

**Frontend not connecting to backend?**
- Verify REACT_APP_BACKEND_URL is correct
- Check backend is running
- Ensure CORS is properly configured

**Images not loading?**
- Check internet connection (images use Unsplash URLs)
- Verify product image URLs in database

## 📞 Support

For issues or questions, contact: support@sparible.com

## 📄 License

All rights reserved © 2026 Sparible

---

**Built with ❤️ using React, FastAPI, and MongoDB**
