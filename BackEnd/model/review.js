const mongoose=require('mongoose');
const reviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: Number, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now }
    //Todo:complete

});

module.exports = mongoose.model('Review', reviewSchema);
