const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./config/passport"); // Make sure this file sets up strategies and serialization

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());