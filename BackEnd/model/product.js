const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    brand: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    countInStock: { type: Number, default: 0 },
    images: [String], // URLs or file paths
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },



















})





const Item = mongoose.model("Item", productSchema);
module.exports = Item;
