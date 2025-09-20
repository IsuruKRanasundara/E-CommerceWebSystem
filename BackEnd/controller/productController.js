const Product = require('../model/product');
const Category = require('../model/category');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 12;
        const skip = (page - 1) * limit;

        // Build query
        let query = {};

        // Search functionality
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        // Category filter
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Price range filter
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
        }

        // Brand filter
        if (req.query.brand) {
            query.brand = new RegExp(req.query.brand, 'i');
        }

        // Status filter
        query.status = req.query.status || 'active';

        // Sort options
        let sortBy = {};
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'price_asc':
                    sortBy = { price: 1 };
                    break;
                case 'price_desc':
                    sortBy = { price: -1 };
                    break;
                case 'rating':
                    sortBy = { rating: -1 };
                    break;
                case 'newest':
                    sortBy = { createdAt: -1 };
                    break;
                default:
                    sortBy = { createdAt: -1 };
            }
        } else {
            sortBy = { createdAt: -1 };
        }

        const products = await Product.find(query)
            .populate('category', 'name')
            .populate('createdBy', 'name')
            .skip(skip)
            .limit(limit)
            .sort(sortBy);

        const totalProducts = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name description')
            .populate('createdBy', 'name email');

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            brand,
            category,
            countInStock,
            images,
            specifications,
            tags
        } = req.body;
        console.log(name, description, price, discountPrice, brand, category, countInStock);
        // Check if category exists


        const product = await Product.create({
            name,
            description,
            price,
            discountPrice,
            brand,
            category,
            countInStock,
            images,
            specifications,
            tags,

        });
        console.log(product);
        const populatedProduct = await Product.findById(product._id)
            .populate('category', 'name')
            .populate('createdBy', 'name');
        console.log(populatedProduct)
        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product: populatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Check if category exists (if being updated)
        if (req.body.category) {
            const categoryExists = await Category.findById(req.body.category);
            if (!categoryExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid category'
                });
            }
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('category', 'name').populate('createdBy', 'name');

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ featured: true, status: 'active' })
            .populate('category', 'name')
            .limit(8)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getFeaturedProducts
};