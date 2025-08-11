import React, { useState, useEffect } from 'react';
import {
    Package,
    ShoppingCart,
    Users,
    Plus,
    Edit,
    Trash2,
    Eye,
    Moon,
    Sun,
    Search,
    Filter,
    Download
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Sample data
    const [products, setProducts] = useState([
        { id: 1, name: 'Laptop Pro', price: 1299.99, stock: 25, category: 'Electronics' },
        { id: 2, name: 'Wireless Mouse', price: 29.99, stock: 100, category: 'Accessories' },
        { id: 3, name: 'Keyboard', price: 79.99, stock: 50, category: 'Accessories' }
    ]);

    const [orders, setOrders] = useState([
        { id: 1001, customer: 'John Doe', total: 1329.98, status: 'Processing', date: '2024-08-08' },
        { id: 1002, customer: 'Jane Smith', total: 79.99, status: 'Shipped', date: '2024-08-07' },
        { id: 1003, customer: 'Bob Wilson', total: 29.99, status: 'Delivered', date: '2024-08-06' }
    ]);

    const [users, setUsers] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Mike Brown', email: 'mike@example.com', role: 'User', status: 'Active' },
        { id: 3, name: 'Sarah Davis', email: 'sarah@example.com', role: 'User', status: 'Inactive' }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({});

    const themeClasses = isDarkMode
        ? 'bg-gray-900 text-white'
        : 'bg-white text-gray-900';

    const sidebarTheme = isDarkMode
        ? 'bg-gray-800 border-gray-700'
        : 'bg-green-50 border-green-200';

    const cardTheme = isDarkMode
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-green-200';

    const handleAction = (action, item = null) => {
        setModalType(action);
        setSelectedItem(item);
        if (item) {
            setFormData(item);
        } else {
            setFormData({});
        }
        setShowModal(true);
    };

    const handleSubmit = () => {
        const actionHandlers = {
            addProduct: () => {
                const newProduct = { ...formData, id: Date.now() };
                setProducts([...products, newProduct]);
            },
            editProduct: () => {
                setProducts(products.map(p => p.id === selectedItem.id ? { ...formData, id: selectedItem.id } : p));
            },
            deleteProduct: () => {
                setProducts(products.filter(p => p.id !== selectedItem.id));
            },
            addAdmin: () => {
                const newUser = { ...formData, id: Date.now(), role: 'Admin' };
                setUsers([...users, newUser]);
            },
            editUser: () => {
                setUsers(users.map(u => u.id === selectedItem.id ? { ...formData, id: selectedItem.id } : u));
            },
            deleteUser: () => {
                setUsers(users.filter(u => u.id !== selectedItem.id));
            }
        };

        actionHandlers[modalType]?.();
        setShowModal(false);
        setFormData({});
    };

    const renderProductForm = () => (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Product Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'}`}
            />
            <input
                type="number"
                placeholder="Price"
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'}`}
            />
            <input
                type="number"
                placeholder="Stock"
                value={formData.stock || ''}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'}`}
            />
            <input
                type="text"
                placeholder="Category"
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'}`}
            />
        </div>
    );

    const renderUserForm = () => (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'}`}
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email || ''}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'}`}
            />
            <select
                value={formData.role || 'User'}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'}`}
            >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
            <select
                value={formData.status || 'Active'}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'}`}
            >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
            </select>
        </div>
    );

    const renderTable = (data, type) => {
        const filteredData = data.filter(item => {
            return Object.values(item).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        return (
            <div className={`${cardTheme} rounded-lg border-2 shadow-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-green-600 text-white">
                        <tr>
                            {type === 'products' && (
                                <>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Price</th>
                                    <th className="p-4 text-left">Stock</th>
                                    <th className="p-4 text-left">Category</th>
                                    <th className="p-4 text-center">Actions</th>
                                </>
                            )}
                            {type === 'orders' && (
                                <>
                                    <th className="p-4 text-left">Order ID</th>
                                    <th className="p-4 text-left">Customer</th>
                                    <th className="p-4 text-left">Total</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Date</th>
                                    <th className="p-4 text-center">Actions</th>
                                </>
                            )}
                            {type === 'users' && (
                                <>
                                    <th className="p-4 text-left">Name</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-left">Role</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={item.id} className={`border-b ${isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-green-100 hover:bg-green-50'} transition-colors`}>
                                {type === 'products' && (
                                    <>
                                        <td className="p-4 font-medium">{item.name}</td>
                                        <td className="p-4">${item.price}</td>
                                        <td className="p-4">{item.stock}</td>
                                        <td className="p-4">{item.category}</td>
                                    </>
                                )}
                                {type === 'orders' && (
                                    <>
                                        <td className="p-4 font-medium">#{item.id}</td>
                                        <td className="p-4">{item.customer}</td>
                                        <td className="p-4">${item.total}</td>
                                        <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                item.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                                        </td>
                                        <td className="p-4">{item.date}</td>
                                    </>
                                )}
                                {type === 'users' && (
                                    <>
                                        <td className="p-4 font-medium">{item.name}</td>
                                        <td className="p-4">{item.email}</td>
                                        <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.role}
                        </span>
                                        </td>
                                        <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                                        </td>
                                    </>
                                )}
                                <td className="p-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => handleAction(`view${type.charAt(0).toUpperCase() + type.slice(1, -1)}`, item)}
                                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                            title="View"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        {type !== 'orders' && (
                                            <button
                                                onClick={() => handleAction(`edit${type.charAt(0).toUpperCase() + type.slice(1, -1)}`, item)}
                                                className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                        )}
                                        {type !== 'orders' && (
                                            <button
                                                onClick={() => handleAction(`delete${type.charAt(0).toUpperCase() + type.slice(1, -1)}`, item)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'products':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <h2 className="text-2xl font-bold text-green-700">Manage Products</h2>
                            <button
                                onClick={() => handleAction('addProduct')}
                                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                <Plus size={20} />
                                Add Product
                            </button>
                        </div>
                        {renderTable(products, 'products')}
                    </div>
                );
            case 'orders':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <h2 className="text-2xl font-bold text-green-700">Manage Orders</h2>
                            <div className="flex gap-2">
                                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <Filter size={18} />
                                    Filter
                                </button>
                                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    <Download size={18} />
                                    Export
                                </button>
                            </div>
                        </div>
                        {renderTable(orders, 'orders')}
                    </div>
                );
            case 'users':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                            <h2 className="text-2xl font-bold text-green-700">Manage Users</h2>
                            <button
                                onClick={() => handleAction('addAdmin')}
                                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                <Plus size={20} />
                                Add Admin
                            </button>
                        </div>
                        {renderTable(users, 'users')}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full w-64 ${sidebarTheme} border-r-2 transition-colors duration-300 z-10`}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-xl font-bold text-green-800">Admin Panel</h1>
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-lg hover:bg-green-100 transition-colors"
                        >
                            {isDarkMode ? <Sun className="text-green-600" size={20} /> : <Moon className="text-green-600" size={20} />}
                        </button>
                    </div>

                    <div className="mb-6 text-center">
                        <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-xl">
                            A
                        </div>
                        <p className="text-green-700 font-medium">Admin User</p>
                    </div>

                    <nav className="space-y-2">
                        {[
                            { id: 'products', label: 'Products', icon: Package },
                            { id: 'orders', label: 'Orders', icon: ShoppingCart },
                            { id: 'users', label: 'Users', icon: Users }
                        ].map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${
                                    activeTab === id
                                        ? 'bg-green-600 text-white'
                                        : 'text-green-700 hover:bg-green-100'
                                }`}
                            >
                                <Icon size={20} />
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="ml-64 p-8">
                <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 ${
                                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-green-200'
                                }`}
                            />
                        </div>
                    </div>
                </div>

                {renderContent()}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${cardTheme} rounded-lg border-2 p-6 w-full max-w-md mx-4 shadow-xl`}>
                        <h3 className="text-xl font-bold mb-4 text-green-700">
                            {modalType.includes('add') ? 'Add' : modalType.includes('edit') ? 'Edit' : modalType.includes('delete') ? 'Delete' : 'View'} {' '}
                            {modalType.includes('Product') ? 'Product' : modalType.includes('User') || modalType.includes('Admin') ? 'User' : 'Item'}
                        </h3>

                        {modalType.includes('delete') ? (
                            <div>
                                <p className="mb-4">Are you sure you want to delete this item?</p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : modalType.includes('view') ? (
                            <div className="space-y-3">
                                {selectedItem && Object.entries(selectedItem).map(([key, value]) => (
                                    <div key={key} className="border-b pb-2">
                                        <span className="font-medium text-green-700 capitalize">{key}:</span>
                                        <span className="ml-2">{value}</span>
                                    </div>
                                ))}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors mt-4"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {(modalType.includes('Product')) && renderProductForm()}
                                {(modalType.includes('User') || modalType.includes('Admin')) && renderUserForm()}

                                <div className="flex gap-4 pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                                    >
                                        {modalType.includes('add') ? 'Add' : 'Save Changes'}
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;