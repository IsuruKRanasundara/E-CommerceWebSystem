import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../service/authService.js";

// Async thunk for login
export const loginUser = createAsyncThunk("auth/login", async (credentials, thunkAPI) => {
    try {
        return await AuthService.login(credentials.email, credentials.password);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
});

export const registerUser = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        return await AuthService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Register failed");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
