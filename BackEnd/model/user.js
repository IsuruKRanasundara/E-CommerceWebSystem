const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {Schema} = mongoose;
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        maxlength: [30, "Username cannot exceed 30 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false
    },
    firstName: String,
    lastName: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    refreshToken: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    phone: {
        type: String,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"]
    },
    avatar: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
if(mongoose.models.User){
    delete mongoose.models.User;
}


module.exports =mongoose.model("User", userSchema);
