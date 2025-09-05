// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../store/userSlice.js';
import { cartReducer } from '../store/cartSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

// Auto-persist cart
store.subscribe(() => {
    try {
        const { cart } = store.getState();
        localStorage.setItem('cart_v1', JSON.stringify(cart));
    } catch {}
});