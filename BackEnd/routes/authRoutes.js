const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, verifyEmail, forgotPassword, resetPassword, changePassword } = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Registration and login
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);

// Email verification
router.get('/verify-email/:token', verifyEmail);

// Password reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Change password (authenticated)
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;