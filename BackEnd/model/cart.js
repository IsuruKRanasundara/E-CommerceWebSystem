
const mongoose=require('mongoose');
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price:{type:Number,required:true}
    }],
});

module.exports = mongoose.model('Cart', cartSchema);
//This is Unnecessary try to enhanced  the cartController like Other Controllers
