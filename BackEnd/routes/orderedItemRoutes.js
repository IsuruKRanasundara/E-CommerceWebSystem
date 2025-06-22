

const express=require('express');
const router=express.Router();
const protectedRoutes=require('../middleware/authMiddleware');
const onlyAdmin=require('../middleware/roleMiddleware');
const {
    createOrderedItems,
    getOrderedItemsById
    }= require('../controller/oderedItemController');


router.get('/:id',protectedRoutes,getOrderedItemsById);
router.post('/:orderDetaile',protectedRoutes,createOrderedItems);
module.exports=router;
