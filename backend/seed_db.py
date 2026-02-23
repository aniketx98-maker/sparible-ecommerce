import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from pathlib import Path
import os
from datetime import datetime, timezone

# Load environment
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Sample categories
categories = [
    {"id": "cat-1", "name": "Battery", "icon": "🔋", "type": "mobile"},
    {"id": "cat-2", "name": "Display & Screens", "icon": "📱", "type": "mobile"},
    {"id": "cat-3", "name": "Body & Housings", "icon": "📦", "type": "mobile"},
    {"id": "cat-4", "name": "Charging Port", "icon": "🔌", "type": "mobile"},
    {"id": "cat-5", "name": "Camera", "icon": "📷", "type": "mobile"},
    {"id": "cat-6", "name": "Laptop Screen", "icon": "💻", "type": "laptop"},
    {"id": "cat-7", "name": "Laptop Keyboard", "icon": "⌨️", "type": "laptop"},
    {"id": "cat-8", "name": "Laptop Battery", "icon": "🔋", "type": "laptop"},
]

# Sample brands
brands = [
    {"id": "brand-1", "name": "Samsung", "logo": "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", "type": "mobile"},
    {"id": "brand-2", "name": "Apple", "logo": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", "type": "mobile"},
    {"id": "brand-3", "name": "Xiaomi", "logo": "https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg", "type": "mobile"},
    {"id": "brand-4", "name": "OnePlus", "logo": "https://upload.wikimedia.org/wikipedia/commons/6/68/OnePlus_logo.svg", "type": "mobile"},
    {"id": "brand-5", "name": "Realme", "logo": "https://upload.wikimedia.org/wikipedia/commons/9/91/Realme_logo.svg", "type": "mobile"},
    {"id": "brand-6", "name": "Vivo", "logo": "https://upload.wikimedia.org/wikipedia/commons/0/05/VIVO_logo.svg", "type": "mobile"},
    {"id": "brand-7", "name": "OPPO", "logo": "https://upload.wikimedia.org/wikipedia/commons/8/89/OPPO_LOGO_2019.svg", "type": "mobile"},
    {"id": "brand-8", "name": "Dell", "logo": "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg", "type": "laptop"},
    {"id": "brand-9", "name": "HP", "logo": "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg", "type": "laptop"},
    {"id": "brand-10", "name": "Lenovo", "logo": "https://upload.wikimedia.org/wikipedia/commons/0/03/Lenovo_Global_Corporate_Logo.png", "type": "laptop"},
]

# Sample products
products = [
    {
        "id": "prod-1",
        "name": "LCD with Touch Screen for Samsung Galaxy S21",
        "description": "Original quality AMOLED display with touch digitizer for Samsung Galaxy S21. Perfect replacement for broken or damaged screens.",
        "category": "Display & Screens",
        "brand": "Samsung",
        "price": 8999.00,
        "discount_price": 7499.00,
        "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
        "stock": 25,
        "rating": 4.5,
        "reviews_count": 128,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-2",
        "name": "Battery for Apple iPhone 12",
        "description": "High capacity replacement battery for iPhone 12. Includes installation tools and adhesive strips.",
        "category": "Battery",
        "brand": "Apple",
        "price": 2499.00,
        "discount_price": 1999.00,
        "image": "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500",
        "stock": 50,
        "rating": 4.8,
        "reviews_count": 256,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-3",
        "name": "Back Panel for Xiaomi Redmi Note 10 Pro",
        "description": "Original quality back glass panel with camera lens for Redmi Note 10 Pro. Easy to install.",
        "category": "Body & Housings",
        "brand": "Xiaomi",
        "price": 1299.00,
        "discount_price": 899.00,
        "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
        "stock": 30,
        "rating": 4.3,
        "reviews_count": 89,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-4",
        "name": "LCD Display for OnePlus 9 Pro",
        "description": "Premium AMOLED display replacement for OnePlus 9 Pro with 120Hz refresh rate support.",
        "category": "Display & Screens",
        "brand": "OnePlus",
        "price": 12999.00,
        "discount_price": 10999.00,
        "image": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
        "stock": 15,
        "rating": 4.7,
        "reviews_count": 67,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-5",
        "name": "Charging Port Flex Cable for Realme GT",
        "description": "Replacement charging port flex cable for Realme GT. Fixes charging issues and connectivity problems.",
        "category": "Charging Port",
        "brand": "Realme",
        "price": 599.00,
        "discount_price": 449.00,
        "image": "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500",
        "stock": 40,
        "rating": 4.2,
        "reviews_count": 45,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-6",
        "name": "Rear Camera Module for Vivo V21",
        "description": "64MP rear camera module replacement for Vivo V21. OEM quality with perfect fit.",
        "category": "Camera",
        "brand": "Vivo",
        "price": 3999.00,
        "discount_price": 3299.00,
        "image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
        "stock": 20,
        "rating": 4.6,
        "reviews_count": 112,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-7",
        "name": "Battery for OPPO Reno 6",
        "description": "Original capacity battery for OPPO Reno 6 with 4300mAh capacity. Safe and reliable.",
        "category": "Battery",
        "brand": "OPPO",
        "price": 1899.00,
        "discount_price": 1499.00,
        "image": "https://images.unsplash.com/photo-1609592287915-f9a08b0ca97d?w=500",
        "stock": 35,
        "rating": 4.4,
        "reviews_count": 78,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-8",
        "name": "15.6 inch LCD Screen for Dell Inspiron",
        "description": "Full HD 1920x1080 replacement screen for Dell Inspiron 15 series laptops.",
        "category": "Laptop Screen",
        "brand": "Dell",
        "price": 5999.00,
        "discount_price": 4999.00,
        "image": "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=500",
        "stock": 18,
        "rating": 4.5,
        "reviews_count": 92,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-9",
        "name": "Replacement Keyboard for HP Pavilion",
        "description": "US layout keyboard replacement for HP Pavilion 15 series. Easy plug and play installation.",
        "category": "Laptop Keyboard",
        "brand": "HP",
        "price": 1499.00,
        "discount_price": 1199.00,
        "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        "stock": 28,
        "rating": 4.3,
        "reviews_count": 56,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-10",
        "name": "Battery for Lenovo ThinkPad T480",
        "description": "6-cell 72Wh battery for Lenovo ThinkPad T480. Extended battery life and reliability.",
        "category": "Laptop Battery",
        "brand": "Lenovo",
        "price": 4999.00,
        "discount_price": 4299.00,
        "image": "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500",
        "stock": 22,
        "rating": 4.7,
        "reviews_count": 134,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-11",
        "name": "LCD Touch Screen for Apple iPhone 13",
        "description": "Premium OLED display with 3D Touch for iPhone 13. Crystal clear display quality.",
        "category": "Display & Screens",
        "brand": "Apple",
        "price": 15999.00,
        "discount_price": 13999.00,
        "image": "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=500",
        "stock": 12,
        "rating": 4.9,
        "reviews_count": 203,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "prod-12",
        "name": "Battery for Samsung Galaxy A52",
        "description": "4500mAh battery replacement for Galaxy A52. Fast charging compatible.",
        "category": "Battery",
        "brand": "Samsung",
        "price": 1599.00,
        "discount_price": 1299.00,
        "image": "https://images.unsplash.com/photo-1609692814867-481629be35e3?w=500",
        "stock": 45,
        "rating": 4.4,
        "reviews_count": 167,
        "created_at": datetime.now(timezone.utc).isoformat()
    },
]

# Sample blog posts
blogs = [
    {
        "id": "blog-1",
        "title": "How to Replace Your Smartphone Battery Safely",
        "excerpt": "Learn the step-by-step process of safely replacing your smartphone battery at home with the right tools and precautions.",
        "content": "Replacing your smartphone battery can extend the life of your device significantly...",
        "image": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800",
        "author": "Sparible Team",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "blog-2",
        "title": "5 Signs Your Laptop Screen Needs Replacement",
        "excerpt": "Discover the common indicators that your laptop screen might need replacement and how to address them.",
        "content": "A damaged laptop screen can significantly impact your productivity...",
        "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
        "author": "Sparible Team",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
    {
        "id": "blog-3",
        "title": "The Ultimate Guide to Mobile Spare Parts Quality",
        "excerpt": "Understanding the difference between original, OEM, and aftermarket spare parts for your mobile device.",
        "content": "When it comes to repairing your smartphone, choosing the right spare parts is crucial...",
        "image": "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800",
        "author": "Sparible Team",
        "created_at": datetime.now(timezone.utc).isoformat()
    },
]

async def seed_database():
    print("Starting database seeding...")
    
    # Clear existing data
    await db.categories.delete_many({})
    await db.brands.delete_many({})
    await db.products.delete_many({})
    await db.blogs.delete_many({})
    
    # Insert categories
    await db.categories.insert_many(categories)
    print(f"Inserted {len(categories)} categories")
    
    # Insert brands
    await db.brands.insert_many(brands)
    print(f"Inserted {len(brands)} brands")
    
    # Insert products
    await db.products.insert_many(products)
    print(f"Inserted {len(products)} products")
    
    # Insert blog posts
    await db.blogs.insert_many(blogs)
    print(f"Inserted {len(blogs)} blog posts")
    
    # Create admin user
    from auth import get_password_hash
    admin_user = {
        "id": "admin-1",
        "email": "admin@sparible.com",
        "password": get_password_hash("admin123"),
        "name": "Admin User",
        "phone": "+91-9022967380",
        "is_admin": True,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    existing_admin = await db.users.find_one({"email": "admin@sparible.com"})
    if not existing_admin:
        await db.users.insert_one(admin_user)
        print("Created admin user (email: admin@sparible.com, password: admin123)")
    
    print("Database seeding completed!")
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_database())
