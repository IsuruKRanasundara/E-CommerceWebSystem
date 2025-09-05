


const express=require('express');
const router=express.Router();
const {authMiddleware}=require('../middleware/authMiddleware');
const {
    createCategory,
    getAllCategories

}= require('../controller/categoryController');

router.post('/',authMiddleware,createCategory);
router.get('/',getAllCategories);
module.exports=router;
