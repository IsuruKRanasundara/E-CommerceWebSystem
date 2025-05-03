const mongoose = require("mongoose");
const userModel= require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../utils/emailService");
const { sendSMS } = require("../utils/smsService");

const createUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
            verificationCode: uuidv4(),
        });
        await newUser.save();
        sendEmail(email, newUser.verificationCode);
        sendSMS(phone, newUser.verificationCode);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server Error,Try Again Later" });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
    
const getUsersById = async (req, res) => {
    try {
        const { id } = req.user._id;
        const users = await userModel.findById(id);
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }
        res.
            status(200).json(users);

    } catch (e) {
        console.error("Error fetching user:", e);
        res.status(500).json({ message: "Server Error" });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.find({ email: email, password: password });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (e) {
        console.error("Error logging in user:", e);
        res.status(500).json({ message: "Server Error" });
    }
};
const updateUser = async (req, res) => {
    try {
        const id = req.user._id;
        const updatedUser = await userModel.findById({ _id: id });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });

    }
};
const deleteUser = async (req, res) => {
    try {
        const id = req.user._id;
        const deletedUser = await userModel.findByIdAndDelete({ _id: id });
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });

    }
};





// Exporting the userController object containing all the methods
// to be used in the routes
const userController = {
    createUser,
    getAllUsers,
    getUsersById,
    loginUser,
    updateUser,
    deleteUser,
};
module.exports = userController;

    
