const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/user');
passport.use(
    new localStrategy((username, password, done) => {
        const user = User.find(u => u.username === username);
        if (!user) return done(null, false, { message: 'User not found' }); 
        if(user.password !== password) 
            return done(null, false, { message: 'Incorrect password' });
        
        return done(null, user);
    })
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    const user = User.find(u => u.id === id);
    done(null, user);
});
