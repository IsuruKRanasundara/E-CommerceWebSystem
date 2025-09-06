// src/utils/constants.js
export const API_BASE_URL = 'http://localhost:3001/api';

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
        LOGOUT: `${API_BASE_URL}/auth/logout`,
        REFRESH: `${API_BASE_URL}/auth/refresh`,
        GOOGLE: `${API_BASE_URL}/auth/google`,
    },
    PRODUCTS: {
        BASE: `${API_BASE_URL}/products`,
        SEARCH: `${API_BASE_URL}/products/search`,
        CATEGORY: `${API_BASE_URL}/products/category`,
    },
    ORDERS: {
        BASE: `${API_BASE_URL}/orders`,
        USER_ORDERS: `${API_BASE_URL}/orders/user`,
    },
    USERS: {
        PROFILE: `${API_BASE_URL}/users/profile`,
        CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
    },
};

export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
};

export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    MODERATOR: 'moderator',
};

export const CART_STORAGE_KEY = 'cart_v1';
export const AUTH_STORAGE_KEY = 'auth_user';
export const TOKEN_STORAGE_KEY = 'auth_token';