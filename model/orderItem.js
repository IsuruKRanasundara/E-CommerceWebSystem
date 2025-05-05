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
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        
    });
const orderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = orderItem;
