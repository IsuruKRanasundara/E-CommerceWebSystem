// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const bcrypt = require('bcryptjs');

// Adjust usernameField if your schema uses 'email' instead of 'username'
passport.use(
    new LocalStrategy(
        { usernameField: 'username', passwordField: 'password' },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });
                if (!user) return done(null, false, { message: 'User not found' });
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