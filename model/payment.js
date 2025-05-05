const mongoose = require('mongoose');
const { Schema } = mongoose;
const paymentSchema = new Schema(
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
        amount: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            enum: ['Credit Card', 'Debit Card', 'PayPal', 'Bank Transfer'],
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Completed', 'Failed'],
            default: 'Pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    });




const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;