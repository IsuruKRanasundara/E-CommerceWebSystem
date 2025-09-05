// server.js
require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Secret key for JWT (keep this safe, don’t hardcode in real projects)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const {authMiddleware}=require("./middleware/authMiddleware");
// ----------------------
// 1. Mock Login Rout
const connectDB=require("./config/db");
// -------------
connectDB();
// ---------
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // In real-world: verify user with DB (or Google login)
    if (username === "admin" && password === "password123") {
        // Payload inside the token
        const payload = { username, role: "admin" };

        // Sign token (expires in 1 hour)
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

        return res.json({ success: true, token });
    }

    res.status(401).json({ success: false, message: "Invalid credentials" });
});

// ----------------------
// 2. Middleware to Verify JWT
// ----------------------



app.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: "This is a protected route",
        user: req.user,
    });
});

const PORT = process.env.PORT || 5000;
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/reviews",require("./routes/reviewRoutes"));
app.use("/api/wishlists",require("./routes/wishlistRoutes"));
app.use("/api/orders",require("./routes/orderRoutes"));
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
