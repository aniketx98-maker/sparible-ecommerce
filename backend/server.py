from fastapi import FastAPI, APIRouter, HTTPException, status, Header, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime
import razorpay

from models import (
    User, UserRegister, UserLogin, Product, ProductCreate, Category, Brand,
    Cart, CartItem, Wishlist, WishlistItem, Order, OrderCreate, OrderItem,
    Review, ReviewCreate, BlogPost, BlogPostCreate
)
from auth import verify_password, get_password_hash, create_access_token, verify_token

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Razorpay client (will work once keys are added)
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "")

if RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET:
    razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))
else:
    razorpay_client = None

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Dependency to get current user
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    token = credentials.credentials
    payload = verify_token(token)
    user_id = payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

# Optional auth dependency
async def get_current_user_optional(authorization: Optional[str] = Header(None)) -> Optional[dict]:
    if not authorization or not authorization.startswith("Bearer "):
        return None
    try:
        token = authorization.replace("Bearer ", "")
        payload = verify_token(token)
        user_id = payload.get("user_id")
        if user_id:
            user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
            return user
    except:
        return None
    return None

# ============= AUTHENTICATION ROUTES =============

@api_router.post("/auth/register")
async def register(user_data: UserRegister):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    # Create user
    hashed_password = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        name=user_data.name,
        phone=user_data.phone
    )
    user_dict = user.model_dump()
    user_dict['password'] = hashed_password
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    
    await db.users.insert_one(user_dict)
    
    # Create access token
    access_token = create_access_token(data={"user_id": user.id})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user.model_dump()
    }

@api_router.post("/auth/login")
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user['password']):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    # Create access token
    access_token = create_access_token(data={"user_id": user['id']})
    
    # Remove password from response
    user.pop('password', None)
    user.pop('_id', None)
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

# ============= PRODUCTS ROUTES =============

@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    brand: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    limit: int = 50
):
    query = {}
    if category:
        query['category'] = category
    if brand:
        query['brand'] = brand
    if search:
        query['name'] = {'$regex': search, '$options': 'i'}
    if min_price is not None or max_price is not None:
        query['price'] = {}
        if min_price is not None:
            query['price']['$gte'] = min_price
        if max_price is not None:
            query['price']['$lte'] = max_price
    
    products = await db.products.find(query, {"_id": 0}).limit(limit).to_list(limit)
    
    # Convert ISO strings back to datetime
    for product in products:
        if isinstance(product.get('created_at'), str):
            product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return products

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    if isinstance(product.get('created_at'), str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return product

@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate, current_user: dict = Depends(get_current_user)):
    # Check if user is admin
    if not current_user.get('is_admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    
    product = Product(**product_data.model_dump())
    product_dict = product.model_dump()
    product_dict['created_at'] = product_dict['created_at'].isoformat()
    
    await db.products.insert_one(product_dict)
    return product

@api_router.put("/products/{product_id}", response_model=Product)
async def update_product(product_id: str, product_data: ProductCreate, current_user: dict = Depends(get_current_user)):
    if not current_user.get('is_admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    
    result = await db.products.update_one(
        {"id": product_id},
        {"$set": product_data.model_dump()}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if isinstance(product.get('created_at'), str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return product

@api_router.delete("/products/{product_id}")
async def delete_product(product_id: str, current_user: dict = Depends(get_current_user)):
    if not current_user.get('is_admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    return {"message": "Product deleted successfully"}

# ============= CATEGORIES ROUTES =============

@api_router.get("/categories", response_model=List[Category])
async def get_categories(type: Optional[str] = None):
    query = {}
    if type:
        query['type'] = type
    categories = await db.categories.find(query, {"_id": 0}).to_list(100)
    return categories

# ============= BRANDS ROUTES =============

@api_router.get("/brands", response_model=List[Brand])
async def get_brands(type: Optional[str] = None):
    query = {}
    if type:
        query['type'] = type
    brands = await db.brands.find(query, {"_id": 0}).to_list(100)
    return brands

# ============= CART ROUTES =============

@api_router.get("/cart")
async def get_cart(current_user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": current_user['id']}, {"_id": 0})
    if not cart:
        # Create empty cart
        cart = Cart(user_id=current_user['id'])
        cart_dict = cart.model_dump()
        cart_dict['updated_at'] = cart_dict['updated_at'].isoformat()
        await db.carts.insert_one(cart_dict)
        return cart
    
    if isinstance(cart.get('updated_at'), str):
        cart['updated_at'] = datetime.fromisoformat(cart['updated_at'])
    
    return cart

@api_router.post("/cart/add")
async def add_to_cart(item: CartItem, current_user: dict = Depends(get_current_user)):
    # Check if product exists
    product = await db.products.find_one({"id": item.product_id})
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    # Get or create cart
    cart = await db.carts.find_one({"user_id": current_user['id']})
    if not cart:
        cart = Cart(user_id=current_user['id'], items=[item.model_dump()])
        cart_dict = cart.model_dump()
        cart_dict['updated_at'] = cart_dict['updated_at'].isoformat()
        await db.carts.insert_one(cart_dict)
    else:
        # Check if item already in cart
        items = cart.get('items', [])
        found = False
        for i, cart_item in enumerate(items):
            if cart_item['product_id'] == item.product_id:
                items[i]['quantity'] += item.quantity
                found = True
                break
        
        if not found:
            items.append(item.model_dump())
        
        await db.carts.update_one(
            {"user_id": current_user['id']},
            {"$set": {"items": items, "updated_at": datetime.now().isoformat()}}
        )
    
    return {"message": "Item added to cart"}

@api_router.post("/cart/remove")
async def remove_from_cart(product_id: str, current_user: dict = Depends(get_current_user)):
    cart = await db.carts.find_one({"user_id": current_user['id']})
    if not cart:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Cart not found")
    
    items = [item for item in cart.get('items', []) if item['product_id'] != product_id]
    
    await db.carts.update_one(
        {"user_id": current_user['id']},
        {"$set": {"items": items, "updated_at": datetime.now().isoformat()}}
    )
    
    return {"message": "Item removed from cart"}

@api_router.post("/cart/clear")
async def clear_cart(current_user: dict = Depends(get_current_user)):
    await db.carts.update_one(
        {"user_id": current_user['id']},
        {"$set": {"items": [], "updated_at": datetime.now().isoformat()}}
    )
    return {"message": "Cart cleared"}

# ============= WISHLIST ROUTES =============

@api_router.get("/wishlist")
async def get_wishlist(current_user: dict = Depends(get_current_user)):
    wishlist = await db.wishlists.find_one({"user_id": current_user['id']}, {"_id": 0})
    if not wishlist:
        wishlist = Wishlist(user_id=current_user['id'])
        wishlist_dict = wishlist.model_dump()
        wishlist_dict['updated_at'] = wishlist_dict['updated_at'].isoformat()
        await db.wishlists.insert_one(wishlist_dict)
        return wishlist
    
    if isinstance(wishlist.get('updated_at'), str):
        wishlist['updated_at'] = datetime.fromisoformat(wishlist['updated_at'])
    
    return wishlist

@api_router.post("/wishlist/add")
async def add_to_wishlist(product_id: str, current_user: dict = Depends(get_current_user)):
    # Check if product exists
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    
    wishlist = await db.wishlists.find_one({"user_id": current_user['id']})
    if not wishlist:
        wishlist = Wishlist(user_id=current_user['id'], items=[product_id])
        wishlist_dict = wishlist.model_dump()
        wishlist_dict['updated_at'] = wishlist_dict['updated_at'].isoformat()
        await db.wishlists.insert_one(wishlist_dict)
    else:
        items = wishlist.get('items', [])
        if product_id not in items:
            items.append(product_id)
            await db.wishlists.update_one(
                {"user_id": current_user['id']},
                {"$set": {"items": items, "updated_at": datetime.now().isoformat()}}
            )
    
    return {"message": "Item added to wishlist"}

@api_router.post("/wishlist/remove")
async def remove_from_wishlist(product_id: str, current_user: dict = Depends(get_current_user)):
    wishlist = await db.wishlists.find_one({"user_id": current_user['id']})
    if not wishlist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wishlist not found")
    
    items = [item for item in wishlist.get('items', []) if item != product_id]
    
    await db.wishlists.update_one(
        {"user_id": current_user['id']},
        {"$set": {"items": items, "updated_at": datetime.now().isoformat()}}
    )
    
    return {"message": "Item removed from wishlist"}

# ============= ORDERS ROUTES =============

@api_router.get("/orders", response_model=List[Order])
async def get_orders(current_user: dict = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": current_user['id']}, {"_id": 0}).to_list(100)
    
    for order in orders:
        if isinstance(order.get('created_at'), str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return orders

@api_router.post("/orders/create")
async def create_order(order_data: OrderCreate, current_user: dict = Depends(get_current_user)):
    order = Order(
        user_id=current_user['id'],
        items=order_data.items,
        total_amount=order_data.total_amount,
        shipping_address=order_data.shipping_address
    )
    
    order_dict = order.model_dump()
    order_dict['created_at'] = order_dict['created_at'].isoformat()
    
    await db.orders.insert_one(order_dict)
    
    # Clear cart after order
    await db.carts.update_one(
        {"user_id": current_user['id']},
        {"$set": {"items": [], "updated_at": datetime.now().isoformat()}}
    )
    
    return order

# ============= RAZORPAY ROUTES =============

@api_router.post("/payment/create-order")
async def create_payment_order(amount: float, current_user: dict = Depends(get_current_user)):
    if not razorpay_client:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Payment gateway not configured. Please add Razorpay keys."
        )
    
    try:
        # Amount should be in paise (multiply by 100)
        order = razorpay_client.order.create({
            "amount": int(amount * 100),
            "currency": "INR",
            "payment_capture": 1
        })
        return order
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@api_router.post("/payment/verify")
async def verify_payment(
    order_id: str,
    payment_id: str,
    signature: str,
    current_user: dict = Depends(get_current_user)
):
    if not razorpay_client:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Payment gateway not configured"
        )
    
    try:
        # Verify payment signature
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        })
        
        # Update order payment status
        await db.orders.update_one(
            {"id": order_id, "user_id": current_user['id']},
            {"$set": {"payment_id": payment_id, "payment_status": "success"}}
        )
        
        return {"message": "Payment verified successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Payment verification failed")

# ============= REVIEWS ROUTES =============

@api_router.get("/reviews/{product_id}", response_model=List[Review])
async def get_reviews(product_id: str):
    reviews = await db.reviews.find({"product_id": product_id}, {"_id": 0}).to_list(100)
    
    for review in reviews:
        if isinstance(review.get('created_at'), str):
            review['created_at'] = datetime.fromisoformat(review['created_at'])
    
    return reviews

@api_router.post("/reviews", response_model=Review)
async def create_review(review_data: ReviewCreate, current_user: dict = Depends(get_current_user)):
    review = Review(
        product_id=review_data.product_id,
        user_id=current_user['id'],
        user_name=current_user['name'],
        rating=review_data.rating,
        comment=review_data.comment
    )
    
    review_dict = review.model_dump()
    review_dict['created_at'] = review_dict['created_at'].isoformat()
    
    await db.reviews.insert_one(review_dict)
    
    # Update product rating
    reviews = await db.reviews.find({"product_id": review_data.product_id}, {"_id": 0}).to_list(1000)
    avg_rating = sum(r['rating'] for r in reviews) / len(reviews) if reviews else 0
    
    await db.products.update_one(
        {"id": review_data.product_id},
        {"$set": {"rating": avg_rating, "reviews_count": len(reviews)}}
    )
    
    return review

# ============= BLOG ROUTES =============

@api_router.get("/blogs", response_model=List[BlogPost])
async def get_blogs(limit: int = 10):
    blogs = await db.blogs.find({}, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
    
    for blog in blogs:
        if isinstance(blog.get('created_at'), str):
            blog['created_at'] = datetime.fromisoformat(blog['created_at'])
    
    return blogs

@api_router.get("/blogs/{blog_id}", response_model=BlogPost)
async def get_blog(blog_id: str):
    blog = await db.blogs.find_one({"id": blog_id}, {"_id": 0})
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog not found")
    
    if isinstance(blog.get('created_at'), str):
        blog['created_at'] = datetime.fromisoformat(blog['created_at'])
    
    return blog

@api_router.post("/blogs", response_model=BlogPost)
async def create_blog(blog_data: BlogPostCreate, current_user: dict = Depends(get_current_user)):
    if not current_user.get('is_admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    
    blog = BlogPost(**blog_data.model_dump())
    blog_dict = blog.model_dump()
    blog_dict['created_at'] = blog_dict['created_at'].isoformat()
    
    await db.blogs.insert_one(blog_dict)
    return blog

# ============= ADMIN ROUTES =============

@api_router.get("/admin/stats")
async def get_admin_stats(current_user: dict = Depends(get_current_user)):
    if not current_user.get('is_admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    
    total_products = await db.products.count_documents({})
    total_orders = await db.orders.count_documents({})
    total_users = await db.users.count_documents({})
    
    # Calculate total revenue
    orders = await db.orders.find({"payment_status": "success"}, {"_id": 0}).to_list(10000)
    total_revenue = sum(order.get('total_amount', 0) for order in orders)
    
    return {
        "total_products": total_products,
        "total_orders": total_orders,
        "total_users": total_users,
        "total_revenue": total_revenue
    }

@api_router.get("/admin/orders", response_model=List[Order])
async def get_all_orders(current_user: dict = Depends(get_current_user)):
    if not current_user.get('is_admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    
    orders = await db.orders.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for order in orders:
        if isinstance(order.get('created_at'), str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return orders

@api_router.put("/admin/orders/{order_id}/status")
async def update_order_status(order_id: str, order_status: str, current_user: dict = Depends(get_current_user)):
    if not current_user.get('is_admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    
    result = await db.orders.update_one(
        {"id": order_id},
        {"$set": {"order_status": order_status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    
    return {"message": "Order status updated"}

# ============= ROOT ROUTE =============

@api_router.get("/")
async def root():
    return {"message": "Sparible E-commerce API", "version": "1.0.0"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
