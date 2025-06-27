const express=require('express');
const router=express.Router();
const protectedRoute=require('../middleware/authMiddleware');
const adminRoutes=require('../middleware/roleMiddleware');


const{

    createWishList,getWishList,updateWishList
} = require('../controller/whishListController');



router.post('/:wishList',protectedRoute,createWishList);
router.get('/:id',protectedRoute,getWishList);
router.put('/:wishList',protectedRoute,updateWishList);
module.exports=router;
