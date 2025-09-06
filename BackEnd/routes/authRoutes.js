const express = require('express');
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const router = express.Router();

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    });
};

// Generate Refresh Token
const generateRefreshToken = () => {
    return jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
    });
};

// SAML SSO Initiation
router.get('/sso', passport.authenticate('saml', {
    failureRedirect: '/login',
    failureFlash: true
}));

// SAML ACS (Assertion Consumer Service) - Handle SAML Response
router.post('/acs', (req, res, next) => {
    passport.authenticate('saml', (err, user, info) => {
        if (err) {
            console.error('SAML authentication error:', err);
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=saml_error`);
        }

        if (!user) {
            console.error('SAML authentication failed:', info);
            return res.redirect(`${process.env.FRONTEND_URL}/login?error=saml_failed`);
        }

        // Generate tokens
        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken();

        // Update user with refresh token
        User.findByIdAndUpdate(user._id, {
            refreshToken: refreshToken,
            lastLogin: new Date()
        }).exec();

        // Set HTTP-only cookie for refresh token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        // Redirect to frontend with token
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&success=true`);
    })(req, res, next);
});

// SAML Metadata endpoint
router.get('/metadata', (req, res) => {
    const samlStrategy = passport._strategy('saml');
    if (samlStrategy) {
        samlStrategy.generateServiceProviderMetadata(null, null, (err, metadata) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to generate metadata' });
            }
            res.type('application/xml');
            res.send(metadata);
        });
    } else {
        res.status(500).json({ error: 'SAML strategy not configured' });
    }
});

// SAML SLO (Single Logout) Initiation
router.get('/slo', async (req, res) => {
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
        const logoutUrl = samlStrategy.generateLogoutRequest(req, user.samlNameId, user.samlSessionIndex);

        res.redirect(logoutUrl);
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
    const samlStrategy = passport._strategy('saml');
    if (samlStrategy) {
        const loginUrl = samlStrategy.generateLoginUrl(req);
        res.json({
            success: true,
            loginUrl: loginUrl || `${process.env.BACKEND_URL}/auth/saml/sso`
        });
    } else {
        res.status(500).json({
            success: false,
            error: 'SAML strategy not configured'
        });
    }
});

module.exports = router;