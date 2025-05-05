const mongoose = require('mongoose');
const { Schema } = mongoose;
const cartSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    



    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cartItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem',
        required: true,
    },
    
    totalPrice: {
        type: Number,
        required: true,
    },  
    createdAt: {
        type: Date,
        default: Date.now,
    },
   
});
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;