const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true,
        maxlength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        maxlength: [500, "Description cannot exceed 500 characters"]
    },
    image: {
        public_id: String,
        url: String
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    }
}, {
    timestamps: true
});

// Generate slug before saving
categorySchema.pre('save', function(next) {
    if (this.isModified('name')) {
        this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
    }
    next();
});

module.exports = mongoose.model("Category", categorySchema);