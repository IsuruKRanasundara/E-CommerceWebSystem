// src/store/cartSlice.js
import { createSlice, nanoid } from '@reduxjs/toolkit';

const CART_KEY = 'cart_v1';

function loadCart() {
    try {
        const stored = localStorage.getItem(CART_KEY);
        if (!stored) return { items: [] };
        const parsed = JSON.parse(stored);
        return { items: Array.isArray(parsed.items) ? parsed.items : [] };
    } catch {
        return { items: [] };
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadCart(),
    reducers: {
        addItem: {
            prepare(product) {
                return {
                    payload: {
                        lineId: nanoid(),
                        quantity: product.quantity || 1,
                        ...product
                    }
                };
            },
            reducer(state, action) {
                const { productId, quantity } = action.payload;
                const existing = state.items.find(item => item.productId === productId);

                if (existing) {
                    existing.quantity += quantity;
                } else {
                    state.items.push(action.payload);
                }
            }
        },
        updateQuantity(state, action) {
            const { lineId, quantity } = action.payload;
            const item = state.items.find(item => item.lineId === lineId);
            if (item) {
                item.quantity = Math.max(1, quantity);
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.lineId !== action.payload);
        },
        clearCart(state) {
            state.items = [];
        }
    }
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

// Selectors
export const selectCartItems = state => state.cart?.items || [];
export const selectCartCount = state =>
    state.cart?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
export const selectCartTotal = state =>
    state.cart?.items?.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0) || 0;