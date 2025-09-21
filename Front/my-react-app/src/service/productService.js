

import axios from 'axios';

const API_BASE_URL =  'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const ProductService = {
    // Get all products - matches backend getAllProducts
    getAll: async (params = {}) => {
        try {
            const response = await api.get('/products/get', { params });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch products' };
        }
    },

    // Get product by ID - matches backend getProductById
    getById: async (id) => {
        try {
            const response = await api.get(`/products/get/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch product' };
        }
    },

    // Create product - matches backend createProduct
    create: async (productData) => {
        try {
            const response = await api.post('/products/create', productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to create product' };
        }
    },

    // Update product - matches backend updateProduct
    update: async (id, productData) => {
        try {
            const response = await api.put(`/products/get/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update product' };
        }
    },

    // Delete product - matches backend deleteProduct
    delete: async (id) => {
        try {
            const response = await api.delete(`/products/get/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to delete product' };
        }
    },

    // Get featured products - matches backend getFeaturedProducts
    getFeatured: async () => {
        try {
            const response = await api.get('/products/featured');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch featured products' };
        }
    }
};

export default ProductService;