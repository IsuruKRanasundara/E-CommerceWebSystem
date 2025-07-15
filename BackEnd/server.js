const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Session configuration
/*app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

}));*/
// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
// Routes
const authRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/auth", authRoutes);


// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        //Display the port number
        console.log("Port", process.env.PORT);
        console.log("MongoDB URI", process.env.MONGO_URI);
        console.log("MongoDB Connected");
        app.listen(process.env.PORT || 5000, () => {
            console.log("Server running...");
        });
    })
    .catch(err => console.error(err));
