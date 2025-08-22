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





const User = mongoose.model("User", userSchema);
module.exports = User;


