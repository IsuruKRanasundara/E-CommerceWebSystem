const express=require('express');
const router=express.Router();
const {authMiddleware}=require('../middleware/authMiddleware');
const adminRoutes=require('../middleware/roleMiddleware');


const{

    createWishList,getWishList,updateWishList
} = require('../controller/whishListController');



router.post('/:wishList',authMiddleware,createWishList);
router.get('/:id',authMiddleware,getWishList);
router.put('/:wishList',authMiddleware,updateWishList);
module.exports=router;