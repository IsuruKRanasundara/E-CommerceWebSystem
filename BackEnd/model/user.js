const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            return this.provider === 'local'; // Password only required for local users
        },
        minlength: 6,
        select: false
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true }
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'moderator'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    refreshToken: {
        type: String,
        select: false
    },
    // Provider field for different auth methods
    provider: {
        type: String,
        enum: ['local', 'google', 'facebook', 'saml'],
        default: 'local'
    },
    // SAML specific fields
    samlNameId: {
        type: String,
        unique: true,
        sparse: true // Allow null values but ensure uniqueness when present
    },
    samlSessionIndex: {
        type: String
    },
    // Google OAuth fields
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    avatar: {
        type: String
    },
    lastLogin: {
        type: Date
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ samlNameId: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
    virtuals: true
});
if(mongoose.models.User){
    delete mongoose.models.User;
}

module.exports = mongoose.model('User', userSchema);