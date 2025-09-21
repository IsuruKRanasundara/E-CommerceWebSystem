import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice.js';
import cartSlice from './cartSlice';
import productSlice from "./productSlice.js";

export const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        products: productSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        })
});

// Auto-save cart to localStorage
store.subscribe(() => {
    try {
        const state = store.getState();
        localStorage.setItem('cart_v1', JSON.stringify(state.cart));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
});