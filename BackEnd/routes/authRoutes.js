const express = require('express');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const {
    registerUser,
    loginUser,
    logoutUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    refreshToken,
} = require('../controller/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// Generate Refresh Token
const generateRefreshToken = () => {
    return jwt.sign({}, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
    });
};

// Standard Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', authMiddleware, logoutUser);
router.get('/verify-email/:token', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/refresh-token', refreshToken);

// Get current user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -refreshToken');
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                profileImage: user.profileImage,
                isEmailVerified: user.isEmailVerified,
                role: user.role,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user profile'
        });
    }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            address,
            profileImage
        } = req.body;

        const updateData = {};
        if (firstName !== undefined) updateData.firstName = firstName;
        if (lastName !== undefined) updateData.lastName = lastName;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;
        if (profileImage !== undefined) updateData.profileImage = profileImage;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password -refreshToken');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                profileImage: user.profileImage,
                isEmailVerified: user.isEmailVerified,
                role: user.role,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update profile'
        });
    }
});

// Change password
router.put('/change-password', authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: 'Current password and new password are required'
            });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        // Verify current password
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({
                success: false,
                error: 'Current password is incorrect'
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        // Clear all refresh tokens to force re-login on other devices
        await User.findByIdAndUpdate(user._id, { refreshToken: null });

        res.json({
            success: true,
            message: 'Password changed successfully. Please log in again.'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to change password'
        });
    }
});

// Verify token and get user
router.get('/verify', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password -refreshToken');
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                profileImage: user.profileImage,
                isEmailVerified: user.isEmailVerified,
                role: user.role,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({
            success: false,
            error: 'Invalid token'
        });
    }
});

// Upload profile image endpoint (if you want to handle file uploads)
router.post('/upload-profile-image', authMiddleware, async (req, res) => {
    try {
        // This would typically use multer for file upload handling
        // For now, we'll just accept a base64 image or URL
        const { imageUrl } = req.body;

        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                error: 'Image URL is required'
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { profileImage: imageUrl },
            { new: true }
        ).select('-password -refreshToken');

        res.json({
            success: true,
            message: 'Profile image updated successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                address: user.address,
                profileImage: user.profileImage,
                isEmailVerified: user.isEmailVerified,
                role: user.role,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        });
    } catch (error) {
        console.error('Upload profile image error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update profile image'
        });
    }
});

// SAML SSO Initiation
router.get('/sso', passport.authenticate('saml', {
    failureRedirect: '/login',
    failureFlash: true
}));

// SAML ACS (Assertion Consumer Service) - Handle SAML Response
router.post('/acs', (req, res, next) => {
    passport.authenticate('saml', async (err, user, info) => {
        if (err) {
            console.error('SAML authentication error:', err);
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=saml_error`);
        }

        if (!user) {
            console.error('SAML authentication failed:', info);
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=saml_failed`);
        }

        try {
            // Generate tokens
            const token = generateToken(user._id);
            const refreshToken = generateRefreshToken();

            // Update user with refresh token
            await User.findByIdAndUpdate(user._id, {
                refreshToken: refreshToken,
                lastLogin: new Date()
            });

            // Set HTTP-only cookie for refresh token
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });

            // Redirect to frontend with token
            res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&success=true`);
        } catch (error) {
            console.error('Error updating user after SAML auth:', error);
            res.redirect(`${process.env.FRONTEND_URL}/login?error=server_error`);
        }
    })(req, res, next);
});

// SAML Metadata endpoint
router.get('/metadata', (req, res) => {
    try {
        const samlStrategy = passport._strategy('saml');
        if (samlStrategy && samlStrategy.generateServiceProviderMetadata) {
            samlStrategy.generateServiceProviderMetadata(null, null, (err, metadata) => {
                if (err) {
                    console.error('Metadata generation error:', err);
                    return res.status(500).json({ error: 'Failed to generate metadata' });
                }
                res.type('application/xml');
                res.send(metadata);
            });
        } else {
            res.status(500).json({ error: 'SAML strategy not configured or metadata generation not supported' });
        }
    } catch (error) {
        console.error('Metadata endpoint error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// SAML SLO (Single Logout) Initiation
router.get('/slo', authMiddleware, async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user.samlNameId) {
            return res.redirect(`${process.env.FRONTEND_URL}/login`);
        }

        // Clear user session data
        await User.findByIdAndUpdate(user._id, {
            refreshToken: null,
            samlSessionIndex: null
        });

        const samlStrategy = passport._strategy('saml');
        if (samlStrategy && samlStrategy.generateLogoutRequest) {
            const logoutUrl = samlStrategy.generateLogoutRequest(req, user.samlNameId, user.samlSessionIndex);
            res.redirect(logoutUrl);
        } else {
            // Fallback to regular logout
            res.clearCookie('refreshToken');
            res.redirect(`${process.env.FRONTEND_URL}/login?message=logged_out`);
        }
    } catch (error) {
        console.error('SAML logout error:', error);
        res.redirect(`${process.env.FRONTEND_URL}/login?error=logout_failed`);
    }
});

// SAML SLO Callback
router.post('/slo/callback', (req, res) => {
    // Handle logout response from IdP
    res.clearCookie('refreshToken');
    res.redirect(`${process.env.FRONTEND_URL}/login?message=logged_out`);
});

// Get SAML Login URL
router.get('/login-url', (req, res) => {
    try {
        const samlStrategy = passport._strategy('saml');
        if (samlStrategy && samlStrategy.generateLoginUrl) {
            const loginUrl = samlStrategy.generateLoginUrl(req);
            res.json({
                success: true,
                loginUrl: loginUrl || `${process.env.BACKEND_URL}/api/auth/sso`
            });
        } else {
            res.status(500).json({
                success: false,
                error: 'SAML strategy not configured'
            });
        }
    } catch (error) {
        console.error('Login URL generation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate login URL'
        });
    }
});

module.exports = router;