import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './userSlice.js';
import { cartReducer } from './cartSlice';

export const store = configureStore({
    reducer: {
        user: authReducer,
        cart: cartReducer
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