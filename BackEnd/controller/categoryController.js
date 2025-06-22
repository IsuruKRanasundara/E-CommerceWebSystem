const mongoose = require("mongoose");
const categoryModel = require("../model/category");


const catRes=(category,messageText)=>({
    message:messageText,
    category:{
        name:category.name,
    }
});
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new categoryModel({
            name,
        });
        await newCategory.save();
        res.status(201).json(catRes(newCategory,'Category Created Successfully'));
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        res.status(200).json(categories.map(category=>catRes(category,'Category')));
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const categoryController={
    createCategory,
    getAllCategories,
}
module.exports = categoryController;
