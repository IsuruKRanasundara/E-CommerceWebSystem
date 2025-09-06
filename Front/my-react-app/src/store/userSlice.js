import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AuthService from '../service/authService';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            return await AuthService.register(userData);
        } catch (error) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            return await AuthService.login({ email, password });
        } catch (error) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

// Async thunk for getting user profile
export const getUserProfile = createAsyncThunk(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            return await AuthService.getProfile();
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to get profile');
        }
    }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            return await AuthService.updateProfile(id, userData);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update profile');
        }
    }
);

// Async thunk for verifying token
export const verifyToken = createAsyncThunk(
    'user/verifyToken',
    async (_, { rejectWithValue }) => {
        try {
            return await AuthService.verifyToken();
        } catch (error) {
            return rejectWithValue(error.message || 'Token verification failed');
        }
    }
);

const initialState = {
    user: AuthService.getCurrentUser(),
    token: localStorage.getItem('token'),
    isAuthenticated: AuthService.isAuthenticated(),
    loading: false,
    error: null,
    success: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Clear error messages
        clearError: (state) => {
            state.error = null;
        },
        // Clear success messages
        clearSuccess: (state) => {
            state.success = false;
        },
        // Logout user
        logoutUser: (state) => {
            AuthService.logout();
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.success = false;
        },
        // Reset user state
        resetUserState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
        // Set user from local storage (for app initialization)
        setUserFromStorage: (state) => {
            state.user = AuthService.getCurrentUser();
            state.token = localStorage.getItem('token');
            state.isAuthenticated = AuthService.isAuthenticated();
        }
    },
    extraReducers: (builder) => {
        builder
            // Register user cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    state.user = action.payload.user;
                    if (action.payload.token) {
                        state.token = action.payload.token;
                        state.isAuthenticated = true;
                    }
                    state.success = true;
                    state.error = null;
                } else {
                    state.error = action.payload.message;
                    state.success = false;
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // Login user cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.isAuthenticated = true;
                    state.success = true;
                    state.error = null;
                } else {
                    state.error = action.payload.message;
                    state.success = false;
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // Get user profile cases
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload.user };
                state.error = null;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update user profile cases
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { ...state.user, ...action.payload.user };
                state.success = true;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })

            // Verify token cases
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = action.payload;
            });
    },
});

export const {
    clearError,
    clearSuccess,
    logoutUser,
    resetUserState,
    setUserFromStorage
} = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectAuthLoading = (state) => state.user.loading;
export const selectAuthError = (state) => state.user.error;

export const authReducer = userSlice.reducer;
