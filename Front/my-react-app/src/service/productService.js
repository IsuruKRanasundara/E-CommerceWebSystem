import api from "./api";

const OrderService = {
    create: async (data) => {
        const res = await api.post("/orders", data);
        return res.data;
    },

    getUserOrders: async (userId) => {
        const res = await api.get(`/orders/user/${userId}`);
        return res.data;
    },

    getAll: async () => {
        const res = await api.get("/orders");
        return res.data;
    },

    update: async (id, data) => {
        const res = await api.put(`/orders/${id}`, data);
        return res.data;
    },

    delete: async (id) => {
        const res = await api.delete(`/orders/${id}`);
        return res.data;
    },
};

export default OrderService;
