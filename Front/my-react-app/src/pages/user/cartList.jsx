import React, {useEffect, useState} from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import {useNavigate} from "react-router-dom";

export default function CartList() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    // Check for cart updates periodically
    useEffect(() => {
        const interval = setInterval(() => {
            if (existingItem && existingItem.items) {
                setCartItems([...existingItem.items]);
            }
        }, 100); // Check every 100ms

        return () => clearInterval(interval);
    }, []);

    // Initial load
    useEffect(() => {
        if (existingItem && existingItem.items) {
            setCartItems([...existingItem.items]);
        }
    }, []);

    const syncCart = (updatedCart) => {
        existingItem.items = updatedCart;
        setCartItems([...updatedCart]);
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }
        const updatedCart = cartItems.map(item =>
            item.id === id ? {...item, quantity: newQuantity} : item
        );
        syncCart(updatedCart);
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        syncCart(updatedCart);

    };

    const clearCart = () => {
        syncCart([]);
    };

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Close cart and navigate to checkout with cart data
        setIsOpen(false);
        navigate('/checkout', { state: { cartItems: cartItems } });
    };

    return (
        <div className="relative">
            {/* Cart Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-colors duration-200 z-50"
            >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {getTotalItems()}
                    </span>
                )}
            </button>

            {/* Cart Window */}
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
                    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
                        {/* Header */}
                        <div className="bg-orange-500 text-white p-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold">Shopping Cart ({cartItems.length} items)</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-orange-600 p-1 rounded transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 max-h-96">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            navigate('/products');
                                        }}
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                                    >
                                        Browse Products
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                            <div className="flex items-start gap-3">
                                                {/* Product Image */}
                                                <img
                                                    src={item.image || item.imageUrl}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />

                                                {/* Product Details */}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-medium text-gray-800 text-sm">{item.name}</h3>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="text-red-500 hover:text-red-700 transition-colors"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center space-x-2">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                                            >
                                                                <Minus size={14} />
                                                            </button>
                                                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="bg-orange-500 hover:bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                                            >
                                                                <Plus size={14} />
                                                            </button>
                                                        </div>

                                                        <div className="text-right">
                                                            <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                                                            <p className="font-bold text-orange-600">${(item.price * item.quantity).toFixed(2)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 p-4 bg-white">
                            {cartItems.length > 0 && (
                                <>
                                    {/* Clear Cart Button */}
                                    <button
                                        onClick={clearCart}
                                        className="w-full mb-3 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                    >
                                        Clear Cart
                                    </button>

                                    {/* Total */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="text-gray-600">Subtotal ({getTotalItems()} items):</span>
                                            <span className="font-bold text-black">${getTotal().toFixed(2)}</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Checkout Button */}
                            {cartItems.length > 0 && (
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors duration-200"
                                >
                                    Proceed to Checkout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}