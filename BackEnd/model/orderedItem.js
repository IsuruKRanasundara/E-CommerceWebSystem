const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderItemSchema = new Schema({
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
        ref: 'Item',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

// Calculate total price before saving
orderItemSchema.pre('save', function(next) {
    this.totalPrice = this.quantity * this.price;
    next();
});

const OrderItem = mongoose.model('OrderItem', orderItemSchema);
module.exports = OrderItem;