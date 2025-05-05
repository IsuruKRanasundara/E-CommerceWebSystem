const orderModel = require('../model/orderModel');

const createOrder = async (req, res) => {
    try {
        const { cartId, userId, totalPrice } = req.body;
        const newOrder = new orderModel({
            cartId,
            userId,
            totalPrice,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await newOrder.save();
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server Error" });
    }
}