const mongoose = require('mongoose');
const stream = require("stream");
const { Schema } = mongoose;
const paymentSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
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

        paymentcreatedAt: {
            type: Date,
            default: Date.now,


        },



    });




const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
