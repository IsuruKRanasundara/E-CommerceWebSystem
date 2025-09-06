// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {  getAllUsers, updateUser, getUserById, deleteUser } = require('../controller/userController');
const { allowOnlyAdmin } = require('../middleware/roleMiddleware');



// Protected route to check authentication
router.get('/check-auth', authMiddleware, (req, res) => {
    res.status(200).json({
        message: 'Authenticated',
        user: {
            _id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        }
    });
});

// Admin and protected routes
router.get('/profile/', authMiddleware, allowOnlyAdmin, getAllUsers);
router.get('/profile/:id', authMiddleware, getUserById);
router.delete('/profile/:id', authMiddleware, allowOnlyAdmin, deleteUser);
router.put('/profile/:id', authMiddleware, updateUser);

// Fallback for undefined handlers (debugging)
router.use((req, res, next) => {
    if (typeof req.route.stack[req.route.stack.length - 1].handle !== 'function') {
        return res.status(500).json({ success: false, message: 'Route handler is not a function' });
    }
    next();
});

module.exports = router;