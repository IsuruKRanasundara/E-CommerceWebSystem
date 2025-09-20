import axios from 'axios';
import { SSO_LOGIN_URL, GOOGLE_CLIENT_ID } from '@/utils/constants';

// Create axios instance with base configuration
const API = axios.create({
    baseURL:  'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
API.interceptors.request.use(
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

// Response interceptor to handle token refresh and errors
API.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                const refreshResponse = await API.post('/auth/refresh-token');
                const { token } = refreshResponse.data;

                // Update token in storage
                const isRemembered = localStorage.getItem('token');
                if (isRemembered) {
                    localStorage.setItem('token', token);
                } else {
                    sessionStorage.setItem('token', token);
                }

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return API(originalRequest);
            } catch (refreshError) {
                // Refresh failed, clear tokens and redirect to login
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');

                // Redirect to login page
                if (window.location.pathname !== '/signIn') {
                    window.location.href = '/signIn';
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

class AuthService {
    // User Registration
    async register(userData) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.post('/auth/register', userData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // User Login
    async login(credentials) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.post('/auth/login', credentials);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // User Logout
    async logout() {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.post('/auth/logout');
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Verify Token
    async verifyToken(token) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.get('/auth/verify', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get Current User Profile
    async getProfile() {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.get('/auth/profile');
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Update User Profile
    async updateProfile(profileData) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.put('/auth/profile', profileData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Change Password
    async changePassword(passwordData) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.put('/auth/change-password', passwordData);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Google OAuth Authentication
    async googleAuth(googleToken) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.post('/auth/google', { token: googleToken });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get Google OAuth Token (mock implementation)
    async getGoogleToken() {
        return new Promise((resolve, reject) => {
            // This is where you would implement actual Google OAuth
            // For now, this is a mock implementation

            // Example using Google Identity Services
            if (window.google && window.google.accounts) {
                window.google.accounts.id.initialize({
                    client_id: GOOGLE_CLIENT_ID,
                    callback: (response) => {
                        resolve(response.credential);
                    },
                    error_callback: (error) => {
                        reject(new Error('Google authentication failed', error));
                    }
                });
                window.google.accounts.id.prompt();
            } else {
                // Fallback: open Google OAuth popup
                const popup = window.open(
                    `http://localhost:3001/api/auth/google`,
                    'google-oauth',
                    'width=500,height=600,scrollbars=yes,resizable=yes'
                );

                const checkClosed = setInterval(() => {
                    if (popup.closed) {
                        clearInterval(checkClosed);
                        reject(new Error('Google authentication was cancelled'));
                    }
                }, 1000);

                // Listen for message from popup
                const messageListener = (event) => {
                    if (event.origin !== window.location.origin) return;

                    if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
                        clearInterval(checkClosed);
                        window.removeEventListener('message', messageListener);
                        popup.close();
                        resolve(event.data.token);
                    } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
                        clearInterval(checkClosed);
                        window.removeEventListener('message', messageListener);
                        popup.close();
                        reject(new Error(event.data.error));
                    }
                };

                window.addEventListener('message', messageListener);
            }
        });
    }

    // Forgot Password
    async forgotPassword(email) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.post('/auth/forgot-password', { email });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Reset Password
    async resetPassword(token, newPassword) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.post(`/auth/reset-password/${token}`, {
                password: newPassword
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Refresh Token
    async refreshToken() {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.post('/auth/refresh-token');
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Upload Profile Image
    async uploadProfileImage(imageData) {
        // eslint-disable-next-line no-useless-catch
        try {
            const formData = new FormData();

            if (imageData instanceof File) {
                formData.append('image', imageData);
            } else if (typeof imageData === 'string') {
                // Handle base64 or URL
                const response = await API.post('/auth/upload-profile-image', {
                    imageUrl: imageData
                });
                return response;
            }

            const response = await API.post('/auth/upload-profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Verify Email
    async verifyEmail(token) {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.get(`/auth/verify-email/${token}`);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Resend Verification Email
    async resendVerificationEmail() {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await API.post('/auth/resend-verification');
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Get SAML Login URL
    async getSAMLLoginUrl() {
        // eslint-disable-next-line no-useless-catch
        try {
            const response = await axios.get(SSO_LOGIN_URL);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        return !!token;
    }

    // Get stored token
    getToken() {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    }

    // Clear all auth data
    clearAuthData() {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
    }

    // Set token in storage
    setToken(token, remember = false) {
        if (remember) {
            localStorage.setItem('token', token);
            sessionStorage.removeItem('token');
        } else {
            sessionStorage.setItem('token', token);
            localStorage.removeItem('token');
        }
    }

    // Get user from token (decode JWT)
    getUserFromToken(token = null) {
        const authToken = token || this.getToken();
        if (!authToken) return null;

        try {
            const payload = JSON.parse(atob(authToken.split('.')[1]));
            return payload;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    // Check if token is expired
    isTokenExpired(token = null) {
        const authToken = token || this.getToken();
        if (!authToken) return true;

        try {
            const payload = JSON.parse(atob(authToken.split('.')[1]));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            console.error('Error checking token expiration:', error);
            return true;
        }
    }

    // Initialize auth state
    async initializeAuth() {
        const token = this.getToken();
        if (token && !this.isTokenExpired(token)) {
            try {
                const response = await this.verifyToken(token);
                return response.data;
            } catch (error) {
                this.clearAuthData();
                throw error;
            }
        } else if (token) {
            // Token expired, try to refresh
            try {
                const response = await this.refreshToken();
                return response.data;
            } catch (error) {
                this.clearAuthData();
                throw error;
            }
        }
        return null;
    }
}

export default new AuthService();