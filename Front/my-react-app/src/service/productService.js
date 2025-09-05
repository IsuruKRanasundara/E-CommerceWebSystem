import api from "./api";

const ProductService = {
    // Get all products
    getAll: async () => {
        try {
            const response = await api.get("/products/get/");
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch products" };
        }
    },

    // Get product by ID
    getById: async (id) => {
        try {
            const response = await api.get(`/products/get/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch product" };
        }
    },

    // Create new product (Admin only)
    create: async (productData) => {
        try {
            const response = await api.post("/products/create/", productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to create product" };
        }
    },

    // Update product (Admin only)
    update: async (id, productData) => {
        try {
            const response = await api.put(`/products/get/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to update product" };
        }
    },

    // Delete product (Admin only)
    delete: async (id) => {
        try {
            const response = await api.delete(`/products/get/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to delete product" };
        }
    },

    // Get products by category
    getByCategory: async (category) => {
        try {
            const response = await api.get(`/products/get/${category}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch products by category" };
        }
    },

    // Search products
    search: async (query) => {
        try {
            const response = await api.get(`/products/get/${query}?query=${query}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to search products" };
        }
    },

    // Get products by price range
    getByPriceRange: async (minPrice, maxPrice) => {
        try {
            const response = await api.get(`/products/get/priceRange?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to fetch products by price range" };
        }
    },

    // Update product quantity (after purchase)
    updateQuantity: async (id, productData) => {
        try {
            const response = await api.put(`/products/get/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: "Failed to update product quantity" };
        }
    }
};

export default ProductService;