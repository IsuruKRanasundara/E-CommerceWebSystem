
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from '../store/cartSlice';
import { authReducer } from "@/store/userSlice.js";

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


store.subscribe(() => {
    try {
        const { cart } = store.getState();
        localStorage.setItem('cart_v1', JSON.stringify(cart));
    } catch {
        throw new Error('Unable to connect to the store');
    }

});