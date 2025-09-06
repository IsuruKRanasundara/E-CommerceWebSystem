const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();
const PORT=process.env.PORT;
const app = express();
const connectDB=require('./config/db');

// ---------------- Security Middleware ----------------
app.use(helmet());

// ---------------- Rate Limiting ----------------
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false   // Disable the `X-RateLimit-*` headers
});
app.use('/api/', limiter); // apply only to API routes
connectDB();
// ---------------- CORS Configuration ----------------
app.use(cors({
    origin:  'http://localhost:5173', // removed trailing slash
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// ---------------- Body & Cookie Parsing ----------------
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// ---------------- Routes ----------------
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes')); // ensure filename matches exactly
app.use('/api/ordered-items', require('./routes/orderedItemRoutes'));
app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
    console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(` Health check: http://localhost:${PORT}`);
});
// ---------------- Health Check ----------------
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'E-Commerce API is running',
        timestamp: new Date().toISOString()
    });
});

// ---------------- Error Handling Middleware ----------------
app.use((err, req, res, next) => {
    console.error('Error:', err.stack || err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;
