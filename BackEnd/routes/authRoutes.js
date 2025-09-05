const express = require('express');
const router = express.Router();
<<<<<<< Updated upstream
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
=======
const { authMiddleware } = require('../middleware/authMiddleware');
const {
    registerUser,
    loginUser,
    logoutUser,
    refreshToken,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    changePassword,
    validateToken
} = require('../controller/authController');

// Validation middleware
const { validateRegister, validateLogin, validateResetPassword } = require('../middleware/validationMiddleware');

// ====================
// PUBLIC AUTH ROUTES
// ====================

// User Registration
router.post('/register', validateRegister, registerUser);

// User Login
router.post('/login', validateLogin, loginUser);

// Email Verification
router.get('/verify-email/:token', verifyEmail);

// Resend Verification Email
router.post('/resend-verification', resendVerificationEmail);

// Forgot Password
router.post('/forgot-password', forgotPassword);

// Reset Password
router.post('/reset-password/:token', validateResetPassword, resetPassword);

// Refresh Token
router.post('/refresh-token', refreshToken);

// ====================
// PROTECTED AUTH ROUTES
// ====================

// Logout (requires authentication)
router.post('/logout', authMiddleware, logoutUser);

// Change Password (requires authentication)
router.put('/change-password', authMiddleware, changePassword);

// Validate Token (check if current token is valid)
router.get('/validate-token', authMiddleware, validateToken);

// Get Current User Profile
router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        user: {
            id: req.user.id,
            email: req.user.email,
            username: req.user.username,
            role: req.user.role,
            isVerified: req.user.isVerified
        }
    });
});
>>>>>>> Stashed changes

module.exports = router;