const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderItemSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
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
const orderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = orderItem;
