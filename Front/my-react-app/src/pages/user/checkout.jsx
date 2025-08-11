import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cartItems = [] }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
        payment: "card",
    });

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Handle order submission logic here
            if (form.payment === "paypal") {
                return; // PayPal handles its own submission
            }

            // Process other payment methods
            alert("Order placed successfully!");
            navigate("/order-confirmation");
        } catch (error) {
            alert("Error processing order");
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
                    alert("Transaction completed by " + details.payer.name.given_name);
                    navigate("/order-confirmation");
                }}
            />
        </PayPalScriptProvider>
    );

    if (!cartItems.length) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-orange-600 mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Order Summary */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-orange-600 mb-4">Order Summary</h2>
                            <div className="space-y-4">
                                {cartItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 border-b pb-4">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-gray-600">
                                                ${item.price} × {item.quantity}
                                            </p>
                                        </div>
                                        <span className="font-bold text-orange-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                                    </div>
                                ))}
                                <div className="flex justify-between pt-4 font-bold text-lg">
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
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        name="address"
                                        type="text"
                                        required
                                        value={form.address}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                                    <select
                                        name="payment"
                                        value={form.payment}
                                        onChange={handleChange}
                                        className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                                    >
                                        <option value="card">Credit Card</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="cod">Cash on Delivery</option>
                                    </select>
                                </div>

                                {form.payment === "paypal" ? (
                                    renderPayPalButtons()
                                ) : (
                                    <button
                                        type="submit"
                                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-200"
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