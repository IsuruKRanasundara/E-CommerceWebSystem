// src/utils/constants.js
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        GOOGLE: '/auth/google',
    },
    PRODUCTS: {
        BASE: '/products',
        SEARCH: '/products/search',
        CATEGORY: '/products/category',
    },
    ORDERS: {
        BASE: '/orders',
        USER_ORDERS: '/orders/user',
    },
    USERS: {
        PROFILE: '/users/profile',
        CHANGE_PASSWORD: '/users/change-password',
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