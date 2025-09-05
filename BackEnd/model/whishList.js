const mongoose = require('mongoose');
const {Schema}=mongoose;
const wishlistSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
