const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createPayment,

    getPayment,
    getAllPayment
} = require('../controller/paymentController');


//Public Routes

router.post('/', protect, createPayment); // Create a new payment
router.get('/',getAllPayment);
router.get('/:id',protect,getPayment);

module.exports=router;
