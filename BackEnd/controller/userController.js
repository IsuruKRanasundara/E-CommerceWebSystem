const mongoose = require("mongoose");
const userModel= require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const genToken=(user)=>{
    return jwt.sign(
        {

            email:user.email,
            password:user.password,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d'
        }
    );
};
const userRes=(user,messageText)=>({
    message: messageText,
    token:genToken(user),
    user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    }
});



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
            password:hashedPassword,
            phone,
           
        });
        console.log(newUser);

        await newUser.save();

        //sendEmail(email, newUser.verificationCode);
        //sendSMS(phone, newUser.verificationCode);

        console.log(newUser);
        res.status(200).json("User Create Successfully");
        console.log(userRes(newUser,'User Created Successfully'));


    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Server Error,Try Again Later" });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        console.log(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email!' });
        }

        console.log(user.password);
        console.log(password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password!' });
        }
        const generatedToken=genToken(user);
        console.log("Generated Token:", generatedToken);
        res.status(200).json(user, "Login successful");
        console.log(userRes(user,'Login Successful'));
    } catch (e) {
        console.error("Login error:", e);
        return res.status(500).json({ message: 'Server Error ... Try Again!' });
    }
};




const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json(users.map(user=>userRes(user,'successful')));
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.user._id;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userRes(user,'successful'));

    } catch (e) {
        console.error("Error fetching user:", e);
        res.status(500).json({ message: "Server Error" });
    }
};
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        let password=req.body.password;

        console.log(id);
        const updatedUser = await userModel.findByIdAndUpdate({ _id: id }, req.body.email || password, { new: false });
        console.log(updatedUser);



        console.log(updatedUser);

        res.status(200).json('Account Updated Successfully');

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
        res.status(200).json(userRes(deletedUser,'Account deleted SuccessfulY'));

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });

    }
};





//Auths functions and the login functions in User Routes Package

// Exporting the userController object containing all the methods
// to be used in the routes
const userController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    genToken
};
module.exports = userController;


