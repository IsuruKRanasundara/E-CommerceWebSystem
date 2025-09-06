const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SamlStrategy = require('passport-saml').Strategy;
const User = require('../model/User');
const fs = require('fs');
const path = require('path');

// Local Strategy
passport.use(
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email }).select('+password');
                if (!user) return done(null, false, { message: 'User not found' });

                const bcrypt = require('bcryptjs');
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    return done(null, false, { message: 'Incorrect password' });
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

// SAML Strategy
passport.use(
    new SamlStrategy(
        {
            // SAML Configuration
            entryPoint: process.env.SAML_ENTRY_POINT, // Identity Provider SSO URL
            issuer: process.env.SAML_ISSUER, // Service Provider Entity ID
            callbackUrl: process.env.SAML_CALLBACK_URL, // ACS URL
            cert: process.env.SAML_CERT || fs.readFileSync(path.join(__dirname, '../certs/saml-cert.pem'), 'utf8'),

            // Optional: Private key for signing requests
            privateCert: process.env.SAML_PRIVATE_CERT || (
                fs.existsSync(path.join(__dirname, '../certs/saml-private.pem'))
                    ? fs.readFileSync(path.join(__dirname, '../certs/saml-private.pem'), 'utf8')
                    : null
            ),

            // Security settings
            acceptedClockSkewMs: -1,
            identifierFormat: null,
            decryptionPvk: null,
            signatureAlgorithm: 'sha256',
            digestAlgorithm: 'sha256',

            // Attribute mapping
            attributeConsumingServiceIndex: false,
            disableRequestedAuthnContext: true,
            authnContext: 'http://schemas.microsoft.com/ws/2008/06/identity/authenticationmethod/windows',

            // Logout settings
            logoutUrl: process.env.SAML_LOGOUT_URL,
            logoutCallbackUrl: process.env.SAML_LOGOUT_CALLBACK_URL,
        },
        async (profile, done) => {
            try {
                console.log('SAML Profile received:', profile);

                // Extract user information from SAML response
                const email = profile.email || profile.nameID || profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
                const firstName = profile.firstName || profile.givenName || profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'] || '';
                const lastName = profile.lastName || profile.surname || profile['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'] || '';
                const displayName = profile.displayName || profile['http://schemas.microsoft.com/identity/claims/displayname'] || `${firstName} ${lastName}`.trim();
                const username = profile.username || email.split('@')[0];

                if (!email) {
                    return done(new Error('Email not provided in SAML response'));
                }

                // Check if user exists
                let user = await User.findOne({
                    $or: [
                        { email: email },
                        { samlNameId: profile.nameID }
                    ]
                });

                if (user) {
                    // Update existing user with SAML info
                    user.samlNameId = profile.nameID;
                    user.provider = 'saml';
                    user.isVerified = true; // SAML users are pre-verified
                    user.lastLogin = new Date();

                    // Update profile info if missing
                    if (!user.firstName && firstName) user.firstName = firstName;
                    if (!user.lastName && lastName) user.lastName = lastName;
                    if (!user.username && username) user.username = username;

                    await user.save();
                    return done(null, user);
                } else {
                    // Create new user
                    user = new User({
                        email: email,
                        username: username,
                        firstName: firstName || 'Unknown',
                        lastName: lastName || 'User',
                        samlNameId: profile.nameID,
                        provider: 'saml',
                        isVerified: true,
                        isActive: true,
                        lastLogin: new Date()
                    });

                    await user.save();
                    return done(null, user);
                }
            } catch (error) {
                console.error('SAML authentication error:', error);
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) return done(null, false);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;