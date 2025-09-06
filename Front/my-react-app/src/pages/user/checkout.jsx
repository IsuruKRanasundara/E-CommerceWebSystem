import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import {existingItem} from "@/pages/user/products.jsx";

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get cart items from navigation state or from existingItem
    const [cartItems, setCartItems] = useState([]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        payment: "card",
    });

    useEffect(() => {
        // Get cart items from location state (passed from CartList) or fallback to existingItem
        if (location.state && location.state.cartItems) {
            setCartItems(location.state.cartItems);
        } else if (existingItem && existingItem.items) {
            setCartItems([...existingItem.items]);
        }
    }, [location.state]);

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const clearCartAfterOrder = () => {
        // Clear the cart from existingItem
        if (existingItem) {
            existingItem.items = [];
        }
        setCartItems([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Handle order submission logic here
            if (form.payment === "paypal") {
                return; // PayPal handles its own submission
            }

            // Simulate processing delay
            const submitButton = e.target.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Processing...';
            }

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear cart after successful order
            clearCartAfterOrder();

            // Process other payment methods
            alert("Order placed successfully!");
            navigate("/order-confirmation", {
                state: {
                    orderDetails: {
                        items: cartItems,
                        total: total,
                        customerInfo: form
                    }
                }
            });
            console.log(this.existingItem);
        } catch (error) {
            alert("Error processing order"+error);
        } finally {
            // Re-enable button
            const submitButton = e.target.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Place Order';
            }
        }
    };

    const renderPayPalButtons = () => (
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total.toFixed(2),
                            },
                        }],
                    });
                }}
                onApprove={async (data, actions) => {
                    const details = await actions.order.capture();

                    // Clear cart after successful PayPal payment
                    clearCartAfterOrder();

                    alert("Transaction completed by " + details.payer.name.given_name);
                    navigate("/order-confirmation", {
                        state: {
                            orderDetails: {
                                items: cartItems,
                                total: total,
                                paymentDetails: details
                            }
                        }
                    });
                }}
                onError={(err) => {
                    console.error("PayPal error:", err);
                    alert("Payment failed. Please try again.");
                }}
            />
        </PayPalScriptProvider>
    );

    const handleBackToCart = () => {
        navigate(-1); // Go back to previous page (cart)
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-orange-600 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Add some items to your cart before checkout.</p>
                    <div className="space-x-4">
                        <button
                            onClick={handleBackToCart}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition-colors"
                        >
                            Back to Cart
                        </button>
                        <button
                            onClick={() => navigate("/products")}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition-colors"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <button
                    onClick={handleBackToCart}
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-6 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Cart
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Order Summary */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-orange-600 mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 border-b pb-4 last:border-b-0">
                                        <img
                                            src={item.imageUrl || item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-gray-600">
                                                ${item.price.toFixed(2)} × {item.quantity}
                                            </p>
                                        </div>
                                        <span className="font-bold text-orange-600">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                                <div className="flex justify-between pt-4 font-bold text-lg border-t">
                                    <span>Total:</span>
                                    <span className="text-orange-600">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-orange-600 mb-4">Checkout</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-colors"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email *
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-colors"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Shipping Address *
                                    </label>
                                    <input
                                        name="address"
                                        type="text"
                                        required
                                        value={form.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-colors"
                                        placeholder="Enter your complete address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Payment Method
                                    </label>
                                    <select
                                        name="payment"
                                        value={form.payment}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-colors"
                                    >
                                        <option value="card">Credit Card</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="cod">Cash on Delivery</option>
                                    </select>
                                </div>

                                {form.payment === "paypal" ? (
                                    <div className="pt-4">
                                        {renderPayPalButtons()}
                                    </div>
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-bold py-3 rounded-lg transition duration-200 mt-6"
                                    >
                                        Place Order
                                    </button>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;