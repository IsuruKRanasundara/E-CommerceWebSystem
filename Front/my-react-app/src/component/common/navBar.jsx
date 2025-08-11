import React, { useState } from 'react';
import { Menu, X, Search, User, ShoppingCart, Bell } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import NotificationPanel from '../../pages/user/notificationPanel';

// CartSidebar Component
const CartSidebar = ({ isOpen, onClose, cartItems, navigate }) => (
    <>
        {isOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />
        )}
        <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
            <div className="flex flex-col h-full">
                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-orange-600">Shopping Cart</h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    {cartItems.length === 0 ? (
                        <div className="text-center mt-8">
                            <p className="text-gray-500 mb-4">Your cart is empty</p>
                            <button
                                onClick={() => {
                                    onClose();
                                    navigate('/');
                                }}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-all duration-300"
                            >
                                Browse Products
                            </button>
                        </div>
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
                {cartItems.length > 0 && (
                    <div className="p-4 border-t border-gray-200">
                        <div className="mb-4 flex justify-between items-center font-bold">
                            <span>Total:</span>
                            <span className="text-orange-600">
                                ${cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                onClose();
                                navigate('/checkout');
                            }}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span>Proceed to Checkout</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    </>
);

export default function ModernNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [cartItems] = useState([]); // Replace with your cart logic
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <nav className="bg-white shadow-lg border-b-2 border-orange-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold text-xl">
                                LOGO
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {menuItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.path)}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                        location.pathname === item.path
                                            ? 'bg-orange-500 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-orange-100 hover:text-orange-500'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-100 text-gray-700 placeholder-gray-500 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition-all duration-300"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>

                        <button
                            onClick={() => setIsNotificationOpen(true)}
                            className="p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-100 rounded-full transition-all duration-300"
                        >
                            <Bell className="h-5 w-5" />
                        </button>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-100 rounded-full transition-all duration-300 relative"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => navigate('/signIn')}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-orange-500 transition-all duration-300 flex items-center space-x-2 border-2 border-orange-500"
                        >
                            <User className="h-4 w-4" />
                            <span>Sign In</span>
                        </button>

                        <button
                            onClick={() => navigate('/signUp')}
                            className="text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center space-x-2 border-2 border-orange-500"
                        >
                            <User className="h-4 w-4" />
                            <span>Sign Up</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-orange-500 hover:bg-orange-100 p-2 rounded-md transition-all duration-300"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    navigate(item.path);
                                }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                                    location.pathname === item.path
                                        ? 'bg-orange-500 text-white'
                                        : 'text-gray-700 hover:bg-orange-100 hover:text-orange-500'
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Search */}
                    <div className="px-4 py-3 border-t border-gray-200">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-gray-100 text-gray-700 placeholder-gray-500 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="px-4 py-3 border-t border-gray-200 space-y-4">
                        <div className="flex justify-between">
                            <button
                                onClick={() => setIsNotificationOpen(true)}
                                className="p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-100 rounded-full"
                            >
                                <Bell className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-100 rounded-full relative"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <button
                                onClick={() => navigate('/signIn')}
                                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-white hover:text-orange-500 transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-orange-500"
                            >
                                <User className="h-4 w-4" />
                                <span>Sign In</span>
                            </button>
                            <button
                                onClick={() => navigate('/signUp')}
                                className="text-orange-500 px-4 py-2 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 border-2 border-orange-500"
                            >
                                <User className="h-4 w-4" />
                                <span>Sign Up</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cart Sidebar */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                navigate={navigate}
            />

            {/* Notification Panel */}
            <NotificationPanel
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </nav>
    );
}