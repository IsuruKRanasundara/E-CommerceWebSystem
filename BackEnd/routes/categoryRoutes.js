


const express=require('express');
const router=express.Router();
const protectedRoute=require('../middleware/authMiddleware');
const  onlyAdmins=require('../middleware/roleMiddleware');
const {
    createCategory,
    getAllCategories

}= require('../controller/categoryController');

router.post('/:categories',onlyAdmins,protectedRoute,createCategory);
router.get('/',getAllCategories);
module.exports=router;
