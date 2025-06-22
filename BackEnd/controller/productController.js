const productModel = require('../model/product');




const productRes = (product,messageText)=> ({
    message:messageText,
    product:{
        _id:product._id,
        name:product.name,
        description:product.description,
        price:product.price,
        brand:product.brand,
        category:product.category,
        countInStock:product.countInStock,
        images:product.images,
        rating:product.rating,
        numReview:product.numReview
    }
});
const createProduct = async (req, res) => {

    try {
        const { name, description, price,brand, category, stockQuantity  ,images,rating,numReviews } = req.body;
        const newProduct = new productModel({

            name,
            description,
            price,
            brand,
            category,
            stockQuantity,
            images,
            rating,
            numReviews,

        });
        await newProduct.save();
        res.status(200).json(productRes(newProduct,'Product Registered Successfully'));
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().populate('category');
        res.status(200).json(productRes(products,'Products'));
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
        res.status(200).json(productRes(product,'Product'));
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price,brand, category, stockQuantity  ,images,rating,numReviews } = req.body;
        const newProduct = new productModel({

            name,
            description,
            price,
            brand,
            category,
            stockQuantity,
            images,
            rating,
            numReviews,

        },
            { new: true }
        ).populate('category');
        const updatedProduct = await productModel.findByIdAndUpdate({_id:id},{newProduct});
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(productRes(updatedProduct,'Product Info was updated'));
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
        res.status(200).json(productRes(deletedProduct,'Product deleted Successfully'));
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
        res.status(200).json(productRes(products,'Products'));
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
        res.status(200).json(productRes(products,'Product'));
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
        res.status(200).json(productRes(products,'Product'));
    } catch (error) {
        console.error("Error fetching products by price range:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const updateQtyProduct= async (req,res)=>{
    const productAray=req.body;
    try{
        const updateProduct=productAray.map( async (product) => {
            const existingProduct=await productModel.findById({_id:product._id});
            if(!existingProduct) return;
            const newQty=existingProductQty.stockQuantity-product.stockQuantity;
            await productModel.findByIdAndUpdate(product._id,{stockQuantity:newQty},{new:true});



        });
    }catch (e) {
        console.error('Error Occured !',e);

    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateQtyProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    searchProducts,
    getProductsByPriceRange
};


