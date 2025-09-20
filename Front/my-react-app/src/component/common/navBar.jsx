import React, { useState, useEffect } from 'react';
import { Menu, X, Search, User, ShoppingCart, Bell, ChevronDown, LogOut, Settings, Package, Heart } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import NotificationPanel from '../../pages/user/notificationPanel';
import { clearError, logoutUser } from '@/store/userSlice.js';

// User Account Dropdown Component
const UserAccountDropdown = ({ isOpen, onClose, user, onLogout, navigate }) => (
    <>
        {isOpen && (
            <div
                className="fixed inset-0 z-30"
                onClick={onClose}
            />
        )}
        <div className={`absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-40 transition-all duration-200 ${
            isOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform -translate-y-2'
        }`}>
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                        {user?.profileImage ? (
                            <img
                                src={user.profileImage}
                                alt="Profile"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        ) : (
                            <span className="text-white font-medium text-lg">
                                {user?.firstName?.charAt(0)?.toUpperCase() || user?.username?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            {user?.firstName && user?.lastName
                                ? `${user.firstName} ${user.lastName}`
                                : user?.username || 'User'
                            }
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user?.email || 'No email'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-2">
                <button
                    onClick={() => {
                        onClose();
                        navigate('/profile');
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <User className="h-4 w-4 mr-3" />
                    My Profile
                </button>

                <button
                    onClick={() => {
                        onClose();
                        navigate('/orders');
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <Package className="h-4 w-4 mr-3" />
                    My Orders
                </button>

                <button
                    onClick={() => {
                        onClose();
                        navigate('/wishlist');
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <Heart className="h-4 w-4 mr-3" />
                    Wishlist
                </button>

                <button
                    onClick={() => {
                        onClose();
                        navigate('/settings');
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                </button>
            </div>

            <div className="border-t border-gray-100">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                </button>
            </div>
        </div>
    </>
);

// CartSidebar Component
const CartSidebar = ({ isOpen, onClose, cartItems, navigate, updateQuantity, removeItem, getTotal }) => (
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
                                    navigate('/products');
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
                                    <img
                                        src={item.imageUrl || item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.name}</h3>
                                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="bg-orange-500 hover:bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                                            >
                                                -
                                            </button>
                                            <span>Qty: {item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="bg-orange-500 hover:bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <X size={16} />
                                    </button>
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
                                ${getTotal()}
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
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const cart = useSelector((state) => state.cart || { items: [] });

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    // Sync with global cart state
    useEffect(() => {
        if (cart && cart.items) {
            setCartItems([...cart.items]);
        }
    }, [cart]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserMenuOpen]);

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' }
    ];

    const syncCart = (updatedCart) => {
        // Dispatch action to update cart in Redux store
        // dispatch(updateCart(updatedCart));
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

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleLogout = async () => {
        try {
            dispatch(clearError());
            await dispatch(logoutUser()).unwrap();
            setIsUserMenuOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="bg-white shadow-lg border-b-2 border-orange-500 relative">
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
                                    {getTotalItems()}
                                </span>
                            )}
                        </button>

                        {/* User Authentication Section */}
                        {isAuthenticated && user ? (
                            <div className="relative user-menu-container">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-orange-500 hover:bg-orange-100 rounded-full transition-all duration-300"
                                    aria-expanded={isUserMenuOpen}
                                    aria-haspopup="true"
                                >
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                        {user.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt="Profile"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-white font-medium text-sm">
                                                {user.firstName?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <UserAccountDropdown
                                    isOpen={isUserMenuOpen}
                                    onClose={() => setIsUserMenuOpen(false)}
                                    user={user}
                                    onLogout={handleLogout}
                                    navigate={navigate}
                                />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
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
                        )}
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
                                        {getTotalItems()}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Mobile User Menu */}
                        {isAuthenticated && user ? (
                            <div className="space-y-2">
                                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                        {user.profileImage ? (
                                            <img
                                                src={user.profileImage}
                                                alt="Profile"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-white font-medium">
                                                {user.firstName?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">
                                            {user.firstName && user.lastName
                                                ? `${user.firstName} ${user.lastName}`
                                                : user.username || 'User'
                                            }
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email || 'No email'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            navigate('/profile');
                                        }}
                                        className="text-gray-700 px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-500 transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <User className="h-4 w-4" />
                                        <span>My Profile</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            navigate('/orders');
                                        }}
                                        className="text-gray-700 px-4 py-2 rounded-lg hover:bg-orange-100 hover:text-orange-500 transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <Package className="h-4 w-4" />
                                        <span>My Orders</span>
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-300 flex items-center space-x-2"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
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
                        )}
                    </div>
                </div>
            )}

            {/* Cart Sidebar */}
            <CartSidebar
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                navigate={navigate}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                getTotal={getTotal}
            />

            {/* Notification Panel */}
            <NotificationPanel
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </nav>
    );
}