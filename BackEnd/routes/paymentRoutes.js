const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
    createPayment,

    getPayment,
    getAllPayment
} = require('../controller/paymentController');


//Public Routes

router.post('/', authMiddleware, createPayment); // Create a new payment


module.exports=router;