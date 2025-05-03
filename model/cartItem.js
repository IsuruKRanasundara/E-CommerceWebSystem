const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartItemSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
        required: true,
    },
});
const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
