// src/hooks/useCart.js
import { useDispatch, useSelector } from 'react-redux';
import {
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    selectCartItems,
    selectCartCount,
    selectCartTotal
} from '../store/cartSlice';

export function useCart() {
    const dispatch = useDispatch();

    return {
        items: useSelector(selectCartItems),
        count: useSelector(selectCartCount),
        total: useSelector(selectCartTotal),
        addItem: (product) => dispatch(addItem(product)),
        updateQuantity: (lineId, quantity) => dispatch(updateQuantity({ lineId, quantity })),
        removeItem: (lineId) => dispatch(removeItem(lineId)),
        clearCart: () => dispatch(clearCart())
    };
}