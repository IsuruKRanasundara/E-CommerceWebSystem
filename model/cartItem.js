const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartItemSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
        required: true,
    },
    

















    totalPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    
});
const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
