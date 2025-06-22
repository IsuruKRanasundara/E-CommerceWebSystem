const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const userSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true
    },
        email: {
        type: String,
        required: true,
        unique: true
        },
        password: {
        type: String,
        required: true
        },
        isAdmin: {
        type: Boolean,
        default: false },
        address: {

        street: String,
        city: String,
        state: String,
        postalCode: String,

        },
        phone: String,
        createdAt: {
        type: Date,
        default: Date.now
    }
    });

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}
);

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;


