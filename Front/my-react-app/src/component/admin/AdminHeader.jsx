import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User, LogOut, Settings } from 'lucide-react';
import { logoutUser } from '../../store/userSlice';

const AdminHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/signIn');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Left side - Logo */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    </div>

                    {/* Right side - Search and User menu */}
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="p-2 text-gray-600 hover:text-orange-600 relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {/* User menu */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                    <User className="text-orange-600 w-4 h-4" />
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-gray-700">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                            </div>

                            <button className="p-2 text-gray-600 hover:text-gray-800">
                                <Settings className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-600 hover:text-red-600"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
