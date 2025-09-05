// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { createUser, loginUser, getAllUsers, updateUser, getUserById, deleteUser } = require('../controller/userController');
const { allowOnlyAdmin } = require('../middleware/roleMiddleware');

// Auth middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'User is not authenticated' });
};

// Public routes
router.post('/register', createUser);
router.post('/login', loginUser); // FIXED: Changed from GET to POST

// Protected route to check authentication
router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Authenticated',
        user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// Admin and protected routes
router.get('/profile/', allowOnlyAdmin, authMiddleware, getAllUsers);
router.get('/profile/:id', authMiddleware, getUserById);
router.delete('/profile/:id', allowOnlyAdmin, authMiddleware, deleteUser);
router.put('/profile/:id', authMiddleware, updateUser);

module.exports = router;