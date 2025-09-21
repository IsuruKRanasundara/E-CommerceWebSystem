import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../service/authService';

// Async thunks
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await AuthService.register(userData);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(credentials);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

export const verifyToken = createAsyncThunk(
    'user/verifyToken',
    async (token, { rejectWithValue }) => {
        try {
            const response = await AuthService.verifyToken(token);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Token verification failed');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            await AuthService.logout();
            return {};
        } catch (error) {
            return rejectWithValue(error.message || 'Logout failed');
        }
    }
);

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    success: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
        setUserFromStorage: (state) => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (token) {
                state.token = token;
                state.isAuthenticated = true;
            }
        },
        resetUserState: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.success = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.success = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Verify Token
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.isAuthenticated = true;
            })
            .addCase(verifyToken.rejected, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            });
    }
});

export const { clearError, clearSuccess, setUserFromStorage, resetUserState } = userSlice.actions;
export default userSlice.reducer;