const express=require('express');
const router = express.Router();
const {authMiddleware}= require('../middleware/authMiddleware');
const { allowOnlyAdmin} =require('../middleware/roleMiddleware');
const {
    createProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    updateProduct
} = require("../controller/productController");
router.post('/create/',authMiddleware,createProduct);
router.get('/get/',getAllProducts);
router.get('/get/:id',authMiddleware,getProductById);

router.delete('/get/:id',allowOnlyAdmin,authMiddleware,deleteProduct);

router.put('/get/:product',updateProduct);

module.exports=router;