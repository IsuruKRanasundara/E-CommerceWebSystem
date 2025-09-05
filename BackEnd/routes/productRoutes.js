const express=require('express');
const router = express.Router();
const {authMiddleware}= require('../middleware/authMiddleware');
const { allowOnlyAdmin} =require('../middleware/roleMiddleware');
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
router.post('/create/',authMiddleware,createProduct);
router.get('/get/',getAllProducts);
router.get('/get/:id',authMiddleware,getProductById);
router.put('/get/:id',authMiddleware,updateQtyProduct);
router.delete('/get/:id',allowOnlyAdmin,authMiddleware,deleteProduct);
router.get('/get/:category',getProductsByCategory);
router.get('/get/:priceRange',getProductsByPriceRange);
router.get('/get/:product',searchProducts);
router.put('/get/:product',updateProduct);

module.exports=router;