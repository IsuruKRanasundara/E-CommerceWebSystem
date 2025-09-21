import axios from 'axios';

const API_BASE_URL =   'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // For cookies
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired, try to refresh
            try {
                const refreshResponse = await api.post('/auth/refresh-token');
                const newToken = refreshResponse.data.token;

                // Update token in storage
                if (localStorage.getItem('token')) {
                    localStorage.setItem('token', newToken);
                } else {
                    sessionStorage.setItem('token', newToken);
                }

                // Retry original request
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return api.request(error.config);
            } catch (refreshError) {
                // Refresh failed, redirect to login
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                window.location.href = '/signIn';
            }
        }
        return Promise.reject(error);
    }
);

const AuthService = {
    // Register user
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Registration failed' };
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    // Logout user
    logout: async () => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
        } catch (error) {
            console.error('Logout error:', error);
        }
    },

    // Verify token
    verifyToken: async (token) => {
        try {
            const response = await api.get('/auth/verify', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Token verification failed' };
        }
    },

    // Get SAML login URL
    getSAMLLoginUrl: async () => {
        try {
            const response = await api.get('/auth/login-url');
            return response;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get SAML login URL' };
        }
    },

    // Handle SAML callback
    handleSamlCallback: async (token) => {
        try {
            // Store token
            localStorage.setItem('token', token);
            return { success: true };
        } catch (error) {
            throw error.response?.data || { message: 'SAML callback failed' };
        }
    },

    // Get user profile
    getProfile: async () => {
        try {
            const response = await api.get('/auth/profile');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get profile' };
        }
    },

    // Update profile
    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/auth/profile', profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update profile' };
        }
    },

    // Forgot password
    forgotPassword: async (email) => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to send reset email' };
        }
    },

    // Reset password
    resetPassword: async (token, password) => {
        try {
            const response = await api.post(`/auth/reset-password/${token}`, { password });
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to reset password' };
        }
    }
};

export default AuthService;