import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CartService from '../service/cartService';

// Async thunks for cart operations
export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await CartService.addItem(productId, quantity);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to add to cart');
        }
    }
);

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CartService.getCart();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch cart');
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, quantity }, { rejectWithValue }) => {
        try {
            const response = await CartService.updateItem(productId, quantity);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update cart item');
        }
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await CartService.removeItem(productId);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to remove from cart');
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CartService.clearCart();
            return response;
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to clear cart');
        }
    }
);

const initialState = {
    items: [],
    totalAmount: 0,
    totalItems: 0,
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Add to cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products || [];
                state.totalAmount = action.payload.totalAmount || 0;
                state.totalItems = action.payload.totalItems || 0;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch cart
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.items = action.payload.products || [];
                state.totalAmount = action.payload.totalAmount || 0;
                state.totalItems = action.payload.totalItems || 0;
            })
            // Update cart item
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.items = action.payload.products || [];
                state.totalAmount = action.payload.totalAmount || 0;
                state.totalItems = action.payload.totalItems || 0;
            })
            // Remove from cart
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = action.payload.products || [];
                state.totalAmount = action.payload.totalAmount || 0;
                state.totalItems = action.payload.totalItems || 0;
            })
            // Clear cart
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
                state.totalAmount = 0;
                state.totalItems = 0;
            });
    }
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;