

const express=require('express');
const router=express.Router();
const {authMiddleware}=require('../middleware/authMiddleware');
const {
    createOrderedItems,
    getOrderedItemsById
    }= require('../controller/oderedItemController');


router.get('/:id',authMiddleware,getOrderedItemsById);
router.post('/:orderDetaile',authMiddleware,createOrderedItems);
module.exports=router;
