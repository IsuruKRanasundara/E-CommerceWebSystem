const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Assuming you have a controller for handling auth logic

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

// Refresh Token route
router.post('/refresh-token', authController.refreshToken);

// Password Reset route
router.post('/password-reset', authController.passwordReset);
router.post('/password-reset/:token', authController.setNewPassword); // Assuming you send a token for password reset

// Email Verification route
router.get('/verify-email/:token', authController.verifyEmail);

module.exports = router;