import api from "./api";

const ProductService = {
    getAll: async () => {
        const res = await api.get("/products");
        return res.data;
    },

    getById: async (id) => {
        const res = await api.get(`/products/${id}`);
        return res.data;
    },

    create: async (data) => {
        const res = await api.post("/products", data);
        return res.data;
    },

    update: async (id, data) => {
        const res = await api.put(`/products/${id}`, data);
        return res.data;
    },

    delete: async (id) => {
        const res = await api.delete(`/products/${id}`);
        return res.data;
    },
};

export default ProductService;
