const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderItemSchema = new Schema(
    //Schema of Item
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },

    });
const orders = mongoose.model('OrderItem', orderItemSchema);
module.exports = orders;
