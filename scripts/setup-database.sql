-- MongoDB collections will be created automatically
-- This script shows the structure for reference

-- Collections:
-- 1. admins - Store admin user credentials
-- 2. products - Store product information
-- 3. orders - Store customer orders
-- 4. categories - Store product categories

-- Sample admin user (password should be hashed with bcrypt)
-- {
--   "_id": ObjectId,
--   "name": "Admin User",
--   "email": "admin@clothingstore.com",
--   "password": "$2a$12$hashedpassword",
--   "role": "admin",
--   "createdAt": ISODate,
--   "updatedAt": ISODate
-- }

-- Sample product structure:
-- {
--   "_id": ObjectId,
--   "name": "Cotton T-Shirt",
--   "description": "Comfortable cotton t-shirt",
--   "price": 29.99,
--   "category": "shirts",
--   "sizes": ["S", "M", "L", "XL"],
--   "colors": ["Red", "Blue", "White"],
--   "images": ["image1.jpg", "image2.jpg"],
--   "stock": 50,
--   "featured": true,
--   "createdAt": ISODate,
--   "updatedAt": ISODate
-- }

-- Sample order structure:
-- {
--   "_id": ObjectId,
--   "orderNumber": "ORD-001",
--   "customerEmail": "customer@email.com",
--   "customerName": "John Doe",
--   "items": [
--     {
--       "productId": "product_id",
--       "productName": "Cotton T-Shirt",
--       "size": "M",
--       "color": "Blue",
--       "quantity": 2,
--       "price": 29.99
--     }
--   ],
--   "total": 59.98,
--   "status": "pending",
--   "shippingAddress": {
--     "street": "123 Main St",
--     "city": "New York",
--     "state": "NY",
--     "zipCode": "10001",
--     "country": "USA"
--   },
--   "createdAt": ISODate,
--   "updatedAt": ISODate
-- }
