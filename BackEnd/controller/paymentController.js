const Payment = require('../model/payment');
const Order = require('../model/order');

// Create payment
const createPayment = async (req, res) => {
    try {
        const { orderId, amount, paymentMethod } = req.body;
        const userId = req.user.id;

        // Verify order exists and belongs to user
        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const payment = new Payment({
            userId,
            orderId,
            amount,
            paymentMethod
        });

        await payment.save();
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('userId', 'name email')
            .populate('orderId');

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all payments for a user
const getUserPayments = async (req, res) => {
    try {
        const userId = req.user.id;
        const payments = await Payment.find({ userId })
            .populate('orderId')
            .sort({ paymentcreatedAt: -1 });

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPayment,
    getPaymentById,
    getUserPayments
};