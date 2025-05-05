// middleware/roleMiddleware.js

// Middleware to allow only admin role
const allowOnlyAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        message: `Access denied. Only admin role is allowed.`,
      });
    }
    next();
  };
  
  module.exports = { allowOnlyAdmin };
  