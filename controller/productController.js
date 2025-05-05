const productModel = require('../model/productModel');
const createProduct = async (req, res) => {
    try {
        const { name, description, price, stockQuantity, category } = req.body;
        const newProduct = new productModel({
            name,
            description,
            price,
            stockQuantity,
            category,
            createdAt: new Date(),
            updatedAt: createdAt,
        });
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server Error" });
    }
};





const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).populate('category');
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, stockQuantity, category } = req.body;
        const newProduct = await productModel.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                stockQuantity,
                category,
                updatedAt: new Date(),
            },
            { new: true }
        ).populate('category');
        const updatedProduct = await productModel.findByIdAndUpdate({_id:req.user._id});
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Server Error" });
    }


};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await productModel.find({ category: categoryId }).populate('category');
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        const products = await productModel.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
            ],
        }).populate('category');
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const getProductsByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const products = await productModel.find({
            price: { $gte: minPrice, $lte: maxPrice },
        }).populate('category');
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found in this price range" });
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products by price range:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    searchProducts,
    getProductsByPriceRange
};


