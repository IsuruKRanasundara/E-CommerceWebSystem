# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

export default function CartSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Organic Cotton T-Shirt",
      price: 39.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: 89.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content area */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Experience</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sample product cards */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Sample Product 1</h3>
              <p className="text-gray-600 mb-4">$99.99</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Sample Product 2</h3>
              <p className="text-gray-600 mb-4">$149.99</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold text-gray-900 mb-2">Sample Product 3</h3>
              <p className="text-gray-600 mb-4">$79.99</p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">Shopping Cart</h2>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">${item.price}</p>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Checkout ({cartItems.length} items)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Toggle button when sidebar is closed */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed right-4 top-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40"
        >
          <ShoppingBag className="h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      )}

      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );

}
# Complete MERN E-commerce Website Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Backend Architecture](#backend-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Database Models](#database-models)
6. [API Endpoints](#api-endpoints)
7. [Authentication & Authorization](#authentication--authorization)
8. [Payment Integration](#payment-integration)
9. [Features Overview](#features-overview)
10. [Deployment Guide](#deployment-guide)

---

## Project Overview

This MERN stack e-commerce platform provides a complete online shopping experience with modern web technologies. The application supports multi-vendor functionality, advanced product management, secure payment processing, and comprehensive order management.

### Key Objectives
- Scalable and maintainable codebase
- Secure user authentication and authorization
- Efficient product catalog management
- Streamlined checkout and payment process
- Comprehensive admin dashboard
- Mobile-responsive design

---

## Technology Stack

### Frontend
- **React.js** - UI library for building interactive user interfaces
- **Redux Toolkit** - State management for complex application state
- **React Router** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **React Hook Form** - Form handling and validation
- **React Query** - Server state management and caching

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization

### Additional Tools
- **Stripe/PayPal** - Payment processing
- **Nodemailer** - Email service
- **Express Validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logging

---

## Backend Architecture

### Server Structure
```
backend/
├── config/
│   ├── database.js
│   ├── cloudinary.js
│   └── stripe.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   ├── userController.js
│   └── categoryController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── validation.js
│   └── upload.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Category.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   ├── userRoutes.js
│   └── categoryRoutes.js
├── utils/
│   ├── sendEmail.js
│   ├── generateToken.js
│   └── helpers.js
├── server.js
└── package.json
```

### Key Backend Features
- RESTful API design
- Input validation and sanitization
- Error handling middleware
- File upload capabilities
- Email notification system
- Rate limiting and security
- Database indexing for performance

---

## Frontend Architecture

### Component Structure
```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── Loader.js
│   │   │   └── Modal.js
│   │   ├── product/
│   │   │   ├── ProductCard.js
│   │   │   ├── ProductList.js
│   │   │   ├── ProductDetail.js
│   │   │   └── ProductFilter.js
│   │   ├── cart/
│   │   │   ├── CartItem.js
│   │   │   ├── CartSidebar.js
│   │   │   └── CartSummary.js
│   │   └── user/
│   │       ├── Profile.js
│   │       ├── OrderHistory.js
│   │       └── AddressForm.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetails.js
│   │   ├── Cart.js
│   │   ├── Checkout.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   └── Dashboard.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useLocalStorage.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── orderService.js
│   ├── store/
│   │   ├── store.js
│   │   ├── authSlice.js
│   │   ├── cartSlice.js
│   │   └── productSlice.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

---

## Database Models

### User Model
```javascript
{
  _id: ObjectId,
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: {
    type: String,
    enum: ['customer', 'admin', 'vendor'],
    default: 'customer'
  },
  avatar: String,
  phone: String,
  dateOfBirth: Date,
  addresses: [{
    type: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    isDefault: Boolean
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  wishlist: [{ type: ObjectId, ref: 'Product' }],
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  description: String (required),
  price: {
    type: Number,
    required: true,
    min: 0
  },
  comparePrice: Number,
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: String,
  brand: String,
  sku: String (unique),
  images: [{
    url: String,
    alt: String,
    isPrimary: Boolean
  }],
  inventory: {
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    trackQuantity: {
      type: Boolean,
      default: true
    },
    lowStockThreshold: {
      type: Number,
      default: 10
    }
  },
  variants: [{
    name: String,
    options: [String],
    price: Number,
    inventory: Number,
    sku: String
  }],
  attributes: [{
    name: String,
    value: String
  }],
  dimensions: {
    weight: Number,
    length: Number,
    width: Number,
    height: Number
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'draft'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  vendor: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId,
  orderNumber: String (unique),
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: ObjectId,
      ref: 'Product',
      required: true
    },
    name: String,
    price: Number,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    variant: String,
    image: String
  }],
  shippingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  billingAddress: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  pricing: {
    subtotal: Number,
    tax: Number,
    shipping: Number,
    discount: Number,
    total: Number
  },
  payment: {
    method: {
      type: String,
      enum: ['card', 'paypal', 'stripe', 'cod'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    paidAt: Date
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  tracking: {
    carrier: String,
    trackingNumber: String,
    estimatedDelivery: Date
  },
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Model
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  slug: String (required, unique),
  description: String,
  image: String,
  parent: {
    type: ObjectId,
    ref: 'Category',
    default: null
  },
  level: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  seo: {
    title: String,
    description: String,
    keywords: [String]
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Review Model
```javascript
{
  _id: ObjectId,
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: String,
  comment: String,
  images: [String],
  helpful: {
    count: {
      type: Number,
      default: 0
    },
    users: [{
      type: ObjectId,
      ref: 'User'
    }]
  },
  verified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Endpoints

### Authentication Routes
```
POST /api/auth/register - Register new user
POST /api/auth/login - User login
POST /api/auth/logout - User logout
POST /api/auth/forgot-password - Request password reset
POST /api/auth/reset-password - Reset password
POST /api/auth/verify-email - Verify email address
GET /api/auth/me - Get current user profile
```

### Product Routes
```
GET /api/products - Get all products (with filters, pagination)
GET /api/products/:id - Get single product
POST /api/products - Create new product (admin/vendor)
PUT /api/products/:id - Update product (admin/vendor)
DELETE /api/products/:id - Delete product (admin/vendor)
POST /api/products/:id/reviews - Add product review
GET /api/products/search - Search products
GET /api/products/categories/:categoryId - Get products by category
```

### Order Routes
```
POST /api/orders - Create new order
GET /api/orders - Get user orders
GET /api/orders/:id - Get single order
PUT /api/orders/:id/status - Update order status (admin)
POST /api/orders/:id/cancel - Cancel order
GET /api/orders/admin/all - Get all orders (admin)
```

### User Routes
```
GET /api/users/profile - Get user profile
PUT /api/users/profile - Update user profile
POST /api/users/address - Add new address
PUT /api/users/address/:id - Update address
DELETE /api/users/address/:id - Delete address
GET /api/users/wishlist - Get user wishlist
POST /api/users/wishlist/:productId - Add to wishlist
DELETE /api/users/wishlist/:productId - Remove from wishlist
```

### Category Routes
```
GET /api/categories - Get all categories
GET /api/categories/:id - Get single category
POST /api/categories - Create category (admin)
PUT /api/categories/:id - Update category (admin)
DELETE /api/categories/:id - Delete category (admin)
```

### Admin Routes
```
GET /api/admin/dashboard - Get dashboard stats
GET /api/admin/users - Get all users
PUT /api/admin/users/:id/status - Update user status
GET /api/admin/orders - Get all orders
GET /api/admin/products - Get all products
GET /api/admin/analytics - Get sales analytics
```

---

## Authentication & Authorization

### JWT Implementation
- Access tokens for API authentication
- Refresh tokens for token renewal
- Token expiration and rotation
- Secure token storage practices

### Role-Based Access Control
- **Customer**: Basic shopping functionality
- **Vendor**: Product management, order fulfillment
- **Admin**: Full system access, user management

### Security Features
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting on sensitive endpoints
- CORS configuration
- Helmet for security headers

---

## Payment Integration

### Stripe Integration
- Secure payment processing
- Support for multiple payment methods
- Webhook handling for payment events
- Refund processing capabilities

### PayPal Integration
- Alternative payment option
- Express checkout functionality
- Subscription support for recurring payments

### Payment Security
- PCI compliance considerations
- Secure token handling
- Payment data encryption
- Fraud prevention measures

---

## Features Overview

### Customer Features
- **User Registration & Authentication**
  - Email verification
  - Password reset functionality
  - Social login integration
  - Profile management

- **Product Browsing & Search**
  - Advanced filtering and sorting
  - Category navigation
  - Search functionality
  - Product recommendations

- **Shopping Cart**
  - Add/remove items
  - Quantity management
  - Save for later
  - Cart persistence

- **Checkout Process**
  - Guest checkout option
  - Multiple payment methods
  - Address management
  - Order confirmation

- **Order Management**
  - Order history
  - Order tracking
  - Order cancellation
  - Reorder functionality

- **Reviews & Ratings**
  - Product reviews
  - Rating system
  - Review helpfulness
  - Image uploads

### Admin Features
- **Dashboard**
  - Sales analytics
  - Performance metrics
  - Recent activities
  - System overview

- **Product Management**
  - Add/edit/delete products
  - Inventory management
  - Category management
  - Bulk operations

- **Order Management**
  - Order processing
  - Status updates
  - Shipping management
  - Refund processing

- **User Management**
  - User accounts
  - Role assignment
  - Account status
  - Customer support

### Vendor Features
- **Product Catalog**
  - Product creation/editing
  - Inventory tracking
  - Pricing management
  - Media uploads

- **Order Fulfillment**
  - Order notifications
  - Shipping updates
  - Return processing
  - Performance metrics

---

## Deployment Guide

### Environment Setup
```bash
# Backend environment variables
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
STRIPE_PUBLISHABLE_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email
EMAIL_PASS=your-password
```

### Production Deployment
1. **Database Setup**
   - Configure MongoDB Atlas or self-hosted MongoDB
   - Set up database indexes
   - Configure backup strategies

2. **Backend Deployment**
   - Deploy to Heroku, AWS, or DigitalOcean
   - Configure environment variables
   - Set up SSL certificates
   - Configure logging and monitoring

3. **Frontend Deployment**
   - Build React application
   - Deploy to Netlify, Vercel, or CDN
   - Configure environment variables
   - Set up domain and SSL

4. **Additional Services**
   - Configure Cloudinary for image storage
   - Set up email service (SendGrid, Mailgun)
   - Configure payment gateways
   - Set up monitoring and analytics

### Performance Optimization
- Database indexing
- Image optimization
- Caching strategies
- CDN implementation
- Code splitting
- Lazy loading

### Security Best Practices
- Regular security audits
- Dependency updates
- Input validation
- Rate limiting
- HTTPS enforcement
- Data encryption

---

## Testing Strategy

### Backend Testing
- Unit tests for controllers and models
- Integration tests for API endpoints
- Database testing
- Authentication testing

### Frontend Testing
- Component testing with React Testing Library
- User interaction testing
- Form validation testing
- State management testing

### End-to-End Testing
- Complete user workflows
- Payment processing
- Order management
- Cross-browser compatibility

---

## Maintenance & Monitoring

### Performance Monitoring
- Application performance metrics
- Database performance
- Error tracking
- User analytics

### Regular Maintenance
- Database backups
- Security updates
- Performance optimization
- Feature updates

### Support & Documentation
- API documentation
- User guides
- Developer documentation
- Troubleshooting guides

---

This comprehensive documentation provides a complete overview of the MERN stack e-commerce website, covering all essential aspects from architecture to deployment. The modular structure ensures scalability and maintainability while providing a robust foundation for online retail operations.