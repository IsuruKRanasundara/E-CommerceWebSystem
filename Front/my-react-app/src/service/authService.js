const API_BASE_URL =   'http://localhost:3001/api';

class AuthService {
    // Register
    async register(userData) {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return response.json();
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