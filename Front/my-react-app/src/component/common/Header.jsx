import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Heart, LogOut } from 'lucide-react';
import { logoutUser } from '../../store/userSlice';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    const { totalItems } = useSelector((state) => state.cart);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/signIn');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                            <ShoppingCart className="text-white text-sm" />
                        </div>
                        <span className="text-xl font-bold text-gray-800">ShopHub</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                {/* User Menu */}
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                        <User className="text-orange-600 w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                                        {user?.firstName || user?.username}
                                    </span>
                                </div>

                                {/* Wishlist */}
                                <button className="p-2 text-gray-600 hover:text-orange-600 relative">
                                    <Heart className="w-6 h-6" />
                                </button>

                                {/* Cart */}
                                <button className="p-2 text-gray-600 hover:text-orange-600 relative">
                                    <ShoppingCart className="w-6 h-6" />
                                    {totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {totalItems}
                                        </span>
                                    )}
                                </button>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-600 hover:text-red-600"
                                    title="Logout"
                                >
                                    <LogOut className="w-6 h-6" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signIn"
                                    className="text-gray-600 hover:text-orange-600 font-medium"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                        {/* Mobile Menu */}
                        <button className="md:hidden p-2 text-gray-600">
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
