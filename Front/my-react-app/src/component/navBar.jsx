import React, { useState } from 'react';
import { Menu, X, Search, User, ShoppingCart, Bell } from 'lucide-react';
import {useLocation, useNavigate} from "react-router-dom";
import SignIn from "../pages/signIn.jsx";

export default function ModernNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('Home');
    const location =useLocation();
    const navigate = useNavigate();
    const currentPath=location.pathname;
    const menuItems = [
                                                    {name:'Home', path:'/'},
                                                    {name:'Products', path:'/products'},
                                                    {name:'Services', path:'/services'},
                                                    {name:'About', path:'/about'},
                                                    {name:'Contact', path:'/contact'}
                                                ];

    return (
        <nav className="bg-white shadow-lg border-b-2 border-orange-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="bg-orange-800 text-white px-4 py-2 rounded-lg font-bold text-xl">
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
                                    onClick={() => {
                                        setActiveItem(item.name);
                                        navigate(item.path);


                                    }}
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                                        activeItem === item.name && currentPath === item.path
                                            ? 'bg-orange-800 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-orange-100 hover:text-orange-800'
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
                                className="bg-gray-100 text-gray-700 placeholder-gray-500 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:bg-white transition-all duration-300"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>

                        <button className="p-2 text-gray-700 hover:text-orange-800 hover:bg-orange-100 rounded-full transition-all duration-300">
                            <Bell className="h-5 w-5" />
                        </button>

                        <button className="p-2 text-gray-700 hover:text-orange-800 hover:bg-orange-100 rounded-full transition-all duration-300">
                            <ShoppingCart className="h-5 w-5" />
                        </button>

                        <button onClick={()=>navigate('/signIn')&& currentPath==='/signIn'} className="bg-orange-800 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-all duration-300 flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Sign In</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-orange-800 hover:bg-orange-100 p-2 rounded-md transition-all duration-300"
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
                                    setActiveItem(item.name);
                                    setIsMenuOpen(true);
                                }}
                                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                                    activeItem === item.name && currentPath === item.path
                                        ? 'bg-orange-800 text-white'
                                        : 'text-gray-700 hover:bg-orange-100 hover:text-orange-800'
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
                                className="w-full bg-gray-100 text-gray-700 placeholder-gray-500 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-orange-800 focus:bg-white"
                            />
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="px-4 py-3 border-t border-gray-200 flex justify-between items-center">
                        <div className="flex space-x-4">
                            <button className="p-2 text-gray-700 hover:text-orange-800 hover:bg-orange-100 rounded-full">
                                <Bell className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-gray-700 hover:text-orange-800 hover:bg-orange-100 rounded-full">
                                <ShoppingCart className="h-5 w-5" />
                            </button>
                        </div>
                        <button onClick={()=>navigate('/signIn')&& currentPath==='/signIn'} className="bg-orange-800 text-white px-4 py-2 rounded-full hover:bg-orange-700 flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Sign In</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
