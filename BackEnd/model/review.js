const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be at least 1"],
        max: [5, "Rating cannot exceed 5"]
    },
    title: {
        type: String,
        maxlength: [100, "Review title cannot exceed 100 characters"]
    },
    comment: {
        type: String,
        required: [true, "Review comment is required"],
        maxlength: [1000, "Review comment cannot exceed 1000 characters"]
    },
    helpful: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);