import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from "@/service/authService.js";

// Create async thunks for all auth operations
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await AuthService.register(userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.logout();
            AuthService.clearAuthData();
            return response.data;
        } catch (error) {
            AuthService.clearAuthData(); // Clear data even if API call fails
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const verifyToken = createAsyncThunk(
    'user/verifyToken',
    async (token, { rejectWithValue }) => {
        try {
            const response = await AuthService.verifyToken(token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await AuthService.updateProfile(profileData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await AuthService.changePassword(passwordData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const googleAuth = createAsyncThunk(
    'user/googleAuth',
    async (googleToken, { rejectWithValue }) => {
        try {
            const response = await AuthService.googleAuth(googleToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await AuthService.forgotPassword(email);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async ({ token, newPassword }, { rejectWithValue }) => {
        try {
            const response = await AuthService.resetPassword(token, newPassword);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const refreshToken = createAsyncThunk(
    'user/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.refreshToken();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const uploadProfileImage = createAsyncThunk(
    'user/uploadProfileImage',
    async (imageData, { rejectWithValue }) => {
        try {
            const response = await AuthService.uploadProfileImage(imageData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null,
    success: null,
    isEmailVerified: false,
    profileUpdateLoading: false,
    passwordChangeLoading: false,
    imageUploadLoading: false,
};

// User slice
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
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            if (action.payload) {
                state.isAuthenticated = true;
            }
        },
        clearUserData: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.success = null;
            state.isEmailVerified = false;
        },
        updateUserField: (state, action) => {
            if (state.user) {
                const { field, value } = action.payload;
                state.user[field] = value;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Register User
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || 'Registration successful';
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = null;
            })

            // Login User
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isEmailVerified = action.payload.user?.isEmailVerified || false;
                state.success = action.payload.message || 'Login successful';
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = null;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })

            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isEmailVerified = false;
                state.error = null;
                state.success = 'Logged out successfully';
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isEmailVerified = false;
                state.error = action.payload;
            })

            // Verify Token
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.isEmailVerified = action.payload.user?.isEmailVerified || false;
                state.error = null;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.isEmailVerified = false;
                state.error = action.payload;
            })

            // Update Profile
            .addCase(updateProfile.pending, (state) => {
                state.profileUpdateLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profileUpdateLoading = false;
                state.user = action.payload.user;
                state.success = action.payload.message || 'Profile updated successfully';
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.profileUpdateLoading = false;
                state.error = action.payload;
            })

            // Change Password
            .addCase(changePassword.pending, (state) => {
                state.passwordChangeLoading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.passwordChangeLoading = false;
                state.success = action.payload.message || 'Password changed successfully';
                state.error = null;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.passwordChangeLoading = false;
                state.error = action.payload;
            })

            // Google Auth
            .addCase(googleAuth.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googleAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isEmailVerified = true;
                state.success = action.payload.message || 'Google authentication successful';
                state.error = null;
            })
            .addCase(googleAuth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Forgot Password
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || 'Password reset email sent';
                state.error = null;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Reset Password
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message || 'Password reset successful';
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Refresh Token
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                if (action.payload.user) {
                    state.user = action.payload.user;
                }
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.error = action.payload;
            })

            // Upload Profile Image
            .addCase(uploadProfileImage.pending, (state) => {
                state.imageUploadLoading = true;
                state.error = null;
            })
            .addCase(uploadProfileImage.fulfilled, (state, action) => {
                state.imageUploadLoading = false;
                state.user = action.payload.user;
                state.success = action.payload.message || 'Profile image updated successfully';
                state.error = null;
            })
            .addCase(uploadProfileImage.rejected, (state, action) => {
                state.imageUploadLoading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const {
    clearError,
    clearSuccess,
    setUser,
    setToken,
    clearUserData,
    updateUserField,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectAuthLoading = (state) => state.user.loading;
export const selectAuthError = (state) => state.user.error;
export const selectAuthSuccess = (state) => state.user.success;
export const selectToken = (state) => state.user.token;
export const selectIsEmailVerified = (state) => state.user.isEmailVerified;
export const selectProfileUpdateLoading = (state) => state.user.profileUpdateLoading;
export const selectPasswordChangeLoading = (state) => state.user.passwordChangeLoading;
export const selectImageUploadLoading = (state) => state.user.imageUploadLoading;

// Export reducer
export const authReducer = userSlice.reducer;