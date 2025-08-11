import React, { useState, useEffect } from 'react';
import { Bell, X, Tag, Gift, ShoppingBag, Info } from 'lucide-react';

const NotificationPanel = ({ isOpen, onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    // Simulated notifications data - replace with your actual data fetching logic
    useEffect(() => {
        // Simulate fetching notifications
        const mockNotifications = [
            {
                id: 1,
                type: 'promotion',
                title: 'Special Discount!',
                message: '20% off on all electronics this weekend',
                time: '2 hours ago',
                icon: <Tag className="h-5 w-5" />,
                isRead: false
            },
            {
                id: 2,
                type: 'order',
                title: 'Order Shipped',
                message: 'Your order #12345 has been shipped',
                time: '1 day ago',
                icon: <ShoppingBag className="h-5 w-5" />,
                isRead: true
            },
            {
                id: 3,
                type: 'promotion',
                title: 'New Arrival',
                message: 'Check out our latest collection',
                time: '2 days ago',
                icon: <Gift className="h-5 w-5" />,
                isRead: false
            },
            {
                id: 4,
                type: 'info',
                title: 'Profile Updated',
                message: 'Your profile information has been updated successfully',
                time: '3 days ago',
                icon: <Info className="h-5 w-5" />,
                isRead: true
            }
        ];
        setNotifications(mockNotifications);
    }, []);

    const filterNotifications = () => {
        if (activeTab === 'all') return notifications;
        return notifications.filter(notif => notif.type === activeTab);
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50">
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-orange-600 flex items-center">
                                <Bell className="h-5 w-5 mr-2" />
                                Notifications
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex space-x-2 mt-4">
                            {['all', 'promotion', 'order', 'info'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1 rounded-full text-sm capitalize ${
                                        activeTab === tab
                                            ? 'bg-orange-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="flex-1 overflow-y-auto">
                        {filterNotifications().length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No notifications found
                            </div>
                        ) : (
                            <div className="divide-y">
                                {filterNotifications().map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-orange-50 transition-colors duration-150 ${
                                            !notification.isRead ? 'bg-orange-50' : ''
                                        }`}
                                    >
                                        <div className="flex space-x-3">
                                            <div className={`p-2 rounded-full ${
                                                !notification.isRead ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {notification.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-gray-900">
                                                    {notification.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {notification.message}
                                                </p>
                                                <span className="text-xs text-gray-500 mt-2 block">
                                                    {notification.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t">
                        <button
                            onClick={markAllAsRead}
                            className="w-full py-2 text-center text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-150"
                        >
                            Mark all as read
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationPanel;