const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderItems: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number
    }],
    totalPayment:Number,
    status:{
        type:String,
        default:'Pending'
    },
    adress:String,
    createdAt:{
        type:Date,
        default:Date.now

    },
});

module.exports = mongoose.model('Order', orderSchema);
