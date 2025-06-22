const orderModel = require('../model/orderedItem');
const orderRes=(order,messageText)=>({
    message: messageText,
    order: {
        _id: order._id,
        userId: order.userId,
        orderId: order.orderId,
        cartId: order.cartId,
        price: order.price,
    },


});
const createOrder = async (req, res) => {
    try {
        const { cartId, userId, totalPrice } = req.body;
        const newOrder = new orderModel({
            cartId,
            userId,
            totalPrice,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await newOrder.save();
        res.status(201).json(orderRes(newOrder,'Order created successfully'));
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate('cartId userId');
        res.status(200).json(orderRes(orders,'Order'));
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id).populate('cartId userId');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(orderRes(order,'Order'));
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { cartId, userId, totalPrice } = req.body;
        const updatedOrder = await orderModel.findByIdAndUpdate(
            id,
            {
                cartId,
                userId,
                totalPrice,
                updatedAt: new Date(),
            },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(orderRes(updatedOrder,'Order created successfully'));
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedOrder = await orderModel.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(orderRes(deletedOrder,'Order deleted successfully'));
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

const orderController={
    createOrder,
    updateOrder,
    getOrderById,
    getAllOrders,
    deleteOrder,
}
module.exports = orderController;





