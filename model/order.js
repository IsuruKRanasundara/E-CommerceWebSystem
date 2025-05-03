const mongoose = require('mongoose');
const { Schema } = mongoose;
const orderSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        cartId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
            required: true,
        },
        orderDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });
  

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;







//Complete
//Todo:Having to complete order_Item Entity,Payment Entity