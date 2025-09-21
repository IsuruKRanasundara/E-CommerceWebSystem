import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingCart,
    FolderOpen,
    BarChart3,
    Settings,
    HelpCircle
} from 'lucide-react';

const AdminSidebar = () => {
    const menuItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/products', icon: Package, label: 'Products' },
        { path: '/admin/users', icon: Users, label: 'Users' },
        { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
        { path: '/admin/categories', icon: FolderOpen, label: 'Categories' },
        { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
        { path: '/admin/help', icon: HelpCircle, label: 'Help' },
    ];

    return (
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
            <nav className="mt-8">
                <div className="px-4">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">
                        Management
                    </h2>
                </div>
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-orange-50 text-orange-600 border-r-2 border-orange-600'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </aside>
    );
};

export default AdminSidebar;
