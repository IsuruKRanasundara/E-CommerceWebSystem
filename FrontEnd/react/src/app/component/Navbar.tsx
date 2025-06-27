
'use client'
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import {useRouter}  from "next/navigation";
import SignInPage from "@/app/signIn/page";


interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

const Navigation: React.FC = () => {
    const router =useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const navItems: NavItem[] = [
        { label: 'Home', href: '/' },
        {
            label: 'Products',
            href: '/products',
            children: [
                { label: 'Electronics', href: '/products/electronics' },
                { label: 'Clothing', href: '/products/clothing' },
                { label: 'Books', href: '/products/books' },
                { label: 'Home & Garden', href: '/products/home-garden' },

            ],
        },

        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = (label: string) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setActiveDropdown(null);
    };
    const handleSignIn=()=>{
        router.push('./signIn');
    }


    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">L</span>
                            </div>
                            <span className="ml-2 text-xl font-bold text-gray-800">Logo</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block" ref={dropdownRef}>
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <div key={item.label} className="relative">
                                    {item.children ? (
                                        <button
                                            onClick={() => toggleDropdown(item.label)}
                                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-200 group"
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                                                    activeDropdown === item.label ? 'rotate-180' : ''
                                                } group-hover:text-blue-600`}
                                            />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                                        >
                                            {item.label}
                                        </Link>
                                    )}

                                    {/* Dropdown Menu */}
                                    {item.children && activeDropdown === item.label && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all duration-200">
                                            <div className="py-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side icons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" onClick={handleSignIn}>
                            <User className="h-5 w-5" />
                        </button>
                        <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-600 hover:text-blue-600 p-2 rounded-md transition-colors duration-200"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                        ? 'max-h-screen opacity-100'
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 rounded-lg mt-2">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleDropdown(item.label)}
                                            className="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium flex items-center justify-between transition-colors duration-200"
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={`h-4 w-4 transition-transform duration-200 ${
                                                    activeDropdown === item.label ? 'rotate-180' : ''
                                                }`}
                                            />
                                        </button>
                                        {activeDropdown === item.label && (
                                            <div className="pl-4 space-y-1">
                                                {item.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        className="block text-gray-600 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                                        onClick={() => {
                                                            setIsMobileMenuOpen(false);
                                                            setActiveDropdown(null);
                                                        }}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="block text-gray-700 hover:text-blue-600 hover:bg-white px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Mobile icons */}
                        <div className="flex justify-center space-x-6 pt-4 border-t border-gray-200">
                            <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-white transition-colors duration-200">
                                <Search className="h-5 w-5" />
                            </button>
                            <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-white transition-colors duration-200">
                                <User className="h-5 w-5" />
                            </button>
                            <button className="text-gray-600 hover:text-blue-600 p-2 rounded-full hover:bg-white transition-colors duration-200 relative">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
