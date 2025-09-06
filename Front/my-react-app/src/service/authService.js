/* eslint-disable */
import {API_ENDPOINTS} from "@/utils/constants.js";

const API_BASE_URL =  'http://localhost:3001/api';

class AuthService {
    // Register
    async register(userData) {
        const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response.json();
    }
    async initiateSSO() {
        window.location.href = `${API_BASE_URL}/auth/saml/sso`;
    }async getSamlLoginUrl() {
        const response = await fetch(`${API_BASE_URL}/auth/saml/login-url`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    }

    // Handle SAML Callback
    async handleSamlCallback(token) {
        if (token) {
            localStorage.setItem('token', token);

            // Get user info with the token
            const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                localStorage.setItem('user', JSON.stringify(userData.user));
                return { success: true, user: userData.user, token };
            }
        }

        return { success: false };
    }




    // Login
    async login(credentials) {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (data.success && data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }

        return data;
    }

    // Logout
    async logout() {
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            credentials: 'include',
        });

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        return response.json();
    }

    // Get current user
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    // Get token
    getToken() {
        return localStorage.getItem('token');
    }

    // Check if user is authenticated
    isAuthenticated() {
        const token = this.getToken();
        const user = this.getCurrentUser();
        return !!(token && user);
    }

    // Refresh token
    async refreshToken() {
        const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            credentials: 'include',
        });

        const data = await response.json();

        if (data.success && data.token) {
            localStorage.setItem('token', data.token);
        }

        return data;
    }
}

export default new AuthService();