const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createPayment, getPaymentById, updatePayment, deletePayment } = require('../controller/paymentController');


//Public Routes

router.post('/', protect, createPayment); // Create a new payment
router.get('/:id', protect, getPaymentById); // Get a payment by ID
