const express=require('express');

const router = express.Router();
const protectedRoute = require('../middleware/authMiddleware');

const onlyAdmins=require('../middleware/roleMiddleware');
const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
} = require('../controller/orderController');
//only for the admins
router.get('../',protectedRoute,onlyAdmins,getAllOrders);
router.post('/:orderDetails',protectedRoute,createOrder);
router.get('/:id',protectedRoute,getOrderById);
router.put('/:updateDetails',protectedRoute,updateOrder);
router.delete('/:id',protectedRoute,deleteOrder);
