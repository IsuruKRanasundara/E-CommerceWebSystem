
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CreditCard, Truck, Shield, Check, X } from 'lucide-react';

const CartCheckoutFlow = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('cart');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Premium Wireless Headphones',
            price: 129.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
            color: 'Black',
            size: 'One Size'
        },
        {
            id: 2,
            name: 'Smart Fitness Watch',
            price: 199.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
            color: 'Silver',
            size: '42mm'
        },
        {
            id: 3,
            name: 'Organic Cotton T-Shirt',
            price: 24.99,
            quantity: 3,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
            color: 'White',
            size: 'M'
        }
    ]);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
        if (currentPage === 'checkout') {
            setCurrentPage('cart');
        }
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeItem(id);
            return;
        }
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
        showAlertMessage('Item removed from cart');
    };

    const showAlertMessage = (message) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    };

    const calculateTax = (subtotal) => subtotal * 0.08;
    const calculateShipping = () => 9.99;
    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        return subtotal + calculateTax(subtotal) + calculateShipping();
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            showAlertMessage('Your cart is empty!');
            return;
        }
        setCurrentPage('checkout');
    };

    const handlePlaceOrder = () => {
        showAlertMessage('Order placed successfully! Thank you for your purchase.');
        setCartItems([]);
        setCurrentPage('cart');
        setIsCartOpen(false);
    };



    // Alert Component
    const Alert = ({ message, show }) => (
        <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
            show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
            <div className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                <Check className="h-5 w-5" />
                <span className="font-medium">{message}</span>
            </div>
        </div>
    );


// Cart Sidebar
const CartSidebar = () => (
    <>
        {/* Overlay */}
        {isCartOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
                onClick={toggleCart}
            />
        )}

        {/* Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
            {currentPage === 'cart' ? <CartContent /> : <CheckoutContent />}
        </div>
    </>
);

// Cart Content
const CartContent = () => (
    <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
            {cartItems.length}
          </span>
            </div>
            <button
                onClick={toggleCart}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
                <X className="h-5 w-5 text-gray-500" />
            </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
                <div className="text-center py-16">
                    <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Your cart is empty</h3>
                    <p className="text-gray-400 text-sm">Add some items to get started</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex space-x-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                />

                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                                    <div className="flex text-xs text-gray-500 space-x-2 mt-1">
                                        <span>{item.color}</span>
                                        <span>•</span>
                                        <span>{item.size}</span>
                                    </div>
                                    <p className="text-orange-600 font-bold text-sm mt-1">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 p-1 transition-colors duration-200"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 rounded-full hover:bg-white transition-colors duration-200"
                                    >
                                        <Minus className="h-3 w-3 text-gray-600" />
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="p-1 rounded-full hover:bg-white transition-colors duration-200"
                                    >
                                        <Plus className="h-3 w-3 text-gray-600" />
                                    </button>
                                </div>

                                <span className="font-bold text-gray-900 text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Quick Summary */}
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax & Shipping</span>
                        <span className="font-medium">${(calculateTax(calculateSubtotal()) + calculateShipping()).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-base font-bold">
                        <span>Total</span>
                        <span className="text-orange-600">${calculateTotal().toFixed(2)}</span>
                    </div>
                </div>

                <button
                    onClick={handleCheckout}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                    Checkout
                </button>

                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                        <Truck className="h-3 w-3 text-orange-600" />
                        <span>Free shipping</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3 text-orange-600" />
                        <span>Secure checkout</span>
                    </div>
                </div>
            </div>
        )}
    </div>
);

// Checkout Content
const CheckoutContent = () => (
    <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setCurrentPage('cart')}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                >
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                </button>
                <h2 className="text-xl font-bold text-gray-900">Checkout</h2>
            </div>
            <button
                onClick={toggleCart}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
                <X className="h-5 w-5 text-gray-500" />
            </button>
        </div>

        {/* Checkout Form */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Shipping Information */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Shipping Information</h3>
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="First Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                        />
                    </div>
                    <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="City"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                        />
                        <input
                            type="text"
                            placeholder="ZIP Code"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-orange-600" />
                    <span>Payment Information</span>
                </h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                        />
                        <input
                            type="text"
                            placeholder="CVC"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Cardholder Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent text-sm"
                    />
                </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>

                {/* Order Items */}
                <div className="space-y-2 mb-3">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-8 h-8 object-cover rounded"
                                />
                                <div>
                                    <p className="font-medium truncate w-32">{item.name}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>

                <hr className="my-3" />

                {/* Price Breakdown */}
                <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>${calculateShipping().toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-orange-600">${calculateTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
            <button
                onClick={handlePlaceOrder}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
                Place Order - ${calculateTotal().toFixed(2)}
            </button>

            <div className="flex items-center justify-center space-x-2 mt-3 text-xs text-gray-500">
                <Shield className="h-3 w-3 text-orange-600" />
                <span>Your payment information is secure</span>
            </div>
        </div>
    </div>
);

// Demo Page Content

return (
    <div className="relative">
        <Alert message={alertMessage} show={showAlert} />

        <CartSidebar />

    </div>
);
};

export default CartCheckoutFlow;