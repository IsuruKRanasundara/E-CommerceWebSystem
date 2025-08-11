import React, { useState } from 'react';
import { Menu, X, Search, User, ShoppingCart, Bell } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";

// New CartSidebar Component
const CartSidebar = ({ isOpen, onClose, cartItems }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                />
            )}
            
            {/* Sidebar */}
            <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Shopping Cart</h2>
                        <button 
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    
                    {cartItems.length === 0 ? (
                        <p className="text-gray-500 text-center mt-8">Your cart is empty</p>
                    ) : (
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-gray-600">${item.price}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span>Qty: {item.quantity}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default function ModernNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    
    // Cart state
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]); // Add this to manage cart items

    const menuItems = [
        {name:'Home', path:'/'},
        {name:'Products', path:'/products'},
        {name:'Services', path:'/services'},
        {name:'About', path:'/about'},
        {name:'Contact', path:'/contact'}
    ];

    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    return (
        <nav className="bg-white shadow-lg border-b-2 border-primary">
            {/* Existing navbar code... */}
            
            {/* Update the cart button to include item count */}
            <button
                onClick={openCart}
                className="p-2 text-gray-700 hover:text-primary hover:bg-orange-100 rounded-full transition-all duration-300 relative"
            >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartItems.length}
                    </span>
                )}
            </button>

            {/* Cart Sidebar */}
            <CartSidebar 
                isOpen={isCartOpen}
                onClose={closeCart}
                cartItems={cartItems}
            />

            {/* Rest of the existing navbar code... */}
        </nav>
    );
}