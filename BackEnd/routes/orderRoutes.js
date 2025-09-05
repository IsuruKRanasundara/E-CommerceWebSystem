const express=require('express');

const router = express.Router();
const {authMiddleware} = require('../middleware/authMiddleware');

const {allowOnlyAdmin}=require('../middleware/roleMiddleware');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require('../controller/orderController');
//only for the admins
router.get('/',authMiddleware,allowOnlyAdmin,getAllOrders);
router.post('/:orderDetails',authMiddleware,createOrder);
router.get('/:id',authMiddleware,getOrderById);
router.put('/:updateDetails',authMiddleware,updateOrder);
router.delete('/:id',authMiddleware,deleteOrder);
module.exports = router;