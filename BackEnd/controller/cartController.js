const cartModel = require('../model/cart');
const {models} = require("mongoose");
const createCart= async(req,res) => {
    try {
        const { userId, items } = req.body;
        const newCart = new cartModel({
            userId,
            items,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await newCart.save();
        res.status(201).json({ message: "Cart created successfully" });
    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCart = await cartModel.findByIdAndDelete(id);
        if (!deletedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    } catch (error) {
        console.error("Error deleting cart:", error);
        res.status(500).json({ message: "Server Error" });
    }
}




const updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, items } = req.body;
        const updatedCart = await cartModel.findByIdAndUpdate(
            id,
            {
                userId,
                items,
                updatedAt: new Date(),
            },
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart updated successfully", updatedCart });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
const cartController={
    createCart,
    deleteCart,
    updateCart,
}
module.exports=cartController;
