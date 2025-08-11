// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createUser, loginUser, getAllUsers, updateUser, getUsersById, deleteUser } = require('../controller/userController');
const { allowOnlyAdmin } = require('../middleware/roleMiddleware');
const passport = require('passport');

// Auth middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'User is not authenticated' });
};

// Public routes
router.post('/register', createUser);
router.post('/login', loginUser); // Only use loginUser, handle passport in controller

// Protected route to check authentication
router.get('/login', isAuthenticated, (req, res) => {
    res.status(200).json({ message: 'User is authenticated', user: req.user });
});

// Admin and protected routes
router.get('/profile/', allowOnlyAdmin, protect, getAllUsers);
router.get('/profile/:id', protect, getUsersById);
router.delete('/profile/:id', allowOnlyAdmin, protect, deleteUser);
router.put('/profile/:id', protect, updateUser);

module.exports = router;