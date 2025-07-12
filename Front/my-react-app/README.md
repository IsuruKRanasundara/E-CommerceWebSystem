# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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







# E-commerce Authentication System

## Overview

This is a full-stack e-commerce web application built with React, Express.js, and PostgreSQL. The application features a complete authentication system with user signup/signin functionality, session management, and a modern UI built with Tailwind CSS and shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Session Management**: Express sessions with in-memory store
- **Authentication**: bcrypt for password hashing
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development**: tsx for TypeScript execution

## Key Components

### Authentication System
- **User Registration**: Secure signup with email/password validation
- **User Login**: Session-based authentication
- **Password Security**: bcrypt hashing with salt rounds
- **Session Management**: Express sessions with configurable expiration
- **Protected Routes**: Middleware for authentication checks

### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions in `shared/schema.ts`
- **Migrations**: Database migrations managed by Drizzle Kit
- **Storage Interface**: Abstracted storage layer with in-memory fallback

### Frontend Components
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Form Handling**: React Hook Form with Zod schema validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Toast Notifications**: User feedback for actions
- **Loading States**: Comprehensive loading and error handling

## Data Flow

### Authentication Flow
1. User submits signup/signin form
2. Frontend validates data using Zod schemas
3. Request sent to backend API endpoints
4. Backend validates and processes authentication
5. Session created and stored server-side
6. Response sent back with user data
7. Frontend updates global state and redirects

### Session Management
- Sessions stored in memory (development) with planned PostgreSQL store
- Session cookies with HTTP-only flag for security
- Automatic session validation on protected routes
- Session cleanup and expiration handling

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Components**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority
- **State Management**: TanStack Query
- **Routing**: Wouter
- **Validation**: Zod

### Backend Dependencies
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Neon serverless driver
- **ORM**: Drizzle ORM and Drizzle Kit
- **Authentication**: bcrypt for password hashing
- **Sessions**: express-session with memory store
- **Development**: tsx, esbuild

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with hot module replacement
- **Backend**: tsx for TypeScript execution with nodemon-like functionality
- **Database**: PostgreSQL connection via DATABASE_URL environment variable
- **Sessions**: In-memory store for development

### Production Build
- **Frontend**: Vite build to `dist/public` directory
- **Backend**: esbuild bundle to `dist/index.js`
- **Static Files**: Express serves built frontend files
- **Environment**: Production-specific session configuration

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **SESSION_SECRET**: Secret key for session signing
- **NODE_ENV**: Environment mode (development/production)

### Build Commands
- `npm run dev`: Start development servers
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run db:push`: Push database schema changes

## Notable Implementation Details

### Security Considerations
- Password hashing with bcrypt (10 salt rounds)
- HTTP-only session cookies
- CSRF protection through session management
- Input validation with Zod schemas
- SQL injection prevention through Drizzle ORM

### Performance Optimizations
- React Query for efficient data fetching and caching
- Vite for fast development builds
- Component code splitting
- Optimized Tailwind CSS with purging

### User Experience Features
- Responsive design with mobile-first approach
- Loading states and error handling
- Toast notifications for user feedback
- Form validation with real-time feedback
- Animated UI elements for better engagement

The application follows modern web development best practices with a focus on type safety, user experience, and maintainable code architecture.