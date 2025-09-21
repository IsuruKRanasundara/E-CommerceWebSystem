import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

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

const CartService = {
    // Add item to cart - matches backend addToCart
    addItem: async (productId, quantity) => {
        try {
            const response = await api.post('/cart/add', { productId, quantity });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to add item to cart' };
        }
    },

    // Get user's cart - matches backend getCart
    getCart: async () => {
        try {
            const response = await api.get('/cart');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to fetch cart' };
        }
    },

    // Update cart item - matches backend updateCartItem
    updateItem: async (productId, quantity) => {
        try {
            const response = await api.put('/cart/update', { productId, quantity });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update cart item' };
        }
    },

    // Remove item from cart - matches backend removeFromCart
    removeItem: async (productId) => {
        try {
            const response = await api.delete(`/cart/remove/${productId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to remove item from cart' };
        }
    },

    // Clear cart - matches backend clearCart
    clearCart: async () => {
        try {
            const response = await api.delete('/cart/clear');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to clear cart' };
        }
    }
};

export default CartService;