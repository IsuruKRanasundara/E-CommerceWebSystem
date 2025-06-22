const express=require('express');
const router = express.Router();
const protectedRoute= require('../middleware/authMiddleware');
const roleAuthentication =require('../middleware/roleMiddleware');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateQtyProduct,
    deleteProduct,
    getProductsByCategory ,
    getProductsByPriceRange,
    searchProducts,
    updateProduct
} = require("../controller/productController");
router.post('/create/:id',roleAuthentication,protectedRoute,createProduct);
router.get('/get/',getAllProducts);
router.get('/get/:id',protectedRoute,getProductById);
router.put('/get/:id',protectedRoute,updateQtyProduct);
router.delete('/get/:id',roleAuthentication,protectedRoute,deleteProduct);
router.get('/get/:category',getProductsByCategory);
router.get('/get/:priceRange',getProductsByPriceRange);
router.get('/get/:product',searchProducts);
router.put('/get/:product',updateProduct);

module.exports=router;
