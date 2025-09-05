import api from "./api";

const OrderService = {
    // Create new order
    create: async (orderData) => {
        try {
            const response = await api.post(`/orders/${encodeURIComponent(JSON.stringify(orderData))}`, orderData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to create order" };
        }
    },

    // Get user's orders
    getUserOrders: async (userId) => {
        try {
            const response = await api.get(`/orders/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch user orders" };
        }
    },

    // Get all orders (Admin only)
    getAll: async () => {
        try {
            const response = await api.get("/orders/");
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch orders" };
        }
    },

    // Get order by ID
    getById: async (id) => {
        try {
            const response = await api.get(`/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch order" };
        }
    },

    // Update order
    update: async (id, updateData) => {
        try {
            const response = await api.put(`/orders/${encodeURIComponent(JSON.stringify(updateData))}`, updateData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to update order" };
        }
    },

    // Delete order (Admin only)
    delete: async (id) => {
        try {
            const response = await api.delete(`/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to delete order" };
        }
    },

    // Update order status
    updateStatus: async (id, status) => {
        try {
            const response = await api.put(`/orders/${encodeURIComponent(JSON.stringify({ status }))}`, { status });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to update order status" };
        }
    }
};

export default OrderService;