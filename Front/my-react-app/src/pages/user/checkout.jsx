//create a checkout page
import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    payment: "card",
  });
const usingPaypal =()=>(  

    <PayPalScriptProvider options={{ "client-id": "YOUR_PAYPAL_CLIENT_ID" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: "20.00", // Replace with your checkout amount
              },
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {
            alert("Transaction completed by " + details.payer.name.given_name);
            // Handle successful transaction here
          });
        }}
      />
    </PayPalScriptProvider>
  );

  // Dummy cart data
  const cartItems = [
    { name: "Product 1", price: 25 },
    { name: "Product 2", price: 40 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout logic here
    alert("Order placed!");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-8">
      <div className="w-full max-w-lg bg-orange-50 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Checkout
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            type="text"
            required
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            name="address"
            type="text"
            required
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div>
            <label className="block font-semibold text-orange-700 mb-2">Payment Method</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <div className="bg-white p-4 mt-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Order Summary</h3>
            <ul className="mb-2">
              {cartItems.map((item, idx) => (
                <li key={idx} className="flex justify-between py-1">
                  <span>{item.name}</span>
                  <span className="text-orange-700 font-bold">${item.price}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between border-t pt-2 font-bold text-orange-800">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded transition duration-200"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;