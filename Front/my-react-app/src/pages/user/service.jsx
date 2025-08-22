//including services for Ecommerce aplication which like delevary ,deleiveary tracking and online payment like that
//with simple design in tailwind using primary color and white background
//it should be very simple and easy to use and very affordable for eyes
//design in react with tailwind cssfor ecommerce application
import React, { useState } from 'react';
import { Package, Truck, CreditCard, MapPin, Clock, Shield, Phone, Mail } from 'lucide-react';

const EcommerceServices = () => {
    const [activeService, setActiveService] = useState('delivery');

    const services = {
        delivery: {
            icon: <Truck className="w-8 h-8" />,
            title: "Fast Delivery",
            description: "Get your orders delivered quickly and safely to your doorstep",
            features: [
                "Same-day delivery available",
                "Free shipping over $50",
                "Multiple delivery time slots",
                "Contactless delivery option"
            ]
        },
        tracking: {
            icon: <MapPin className="w-8 h-8" />,
            title: "Order Tracking",
            description: "Track your package in real-time from warehouse to your door",
            features: [
                "Real-time GPS tracking",
                "SMS & Email notifications",
                "Delivery status updates",
                "Estimated delivery time"
            ]
        },
        payment: {
            icon: <CreditCard className="w-8 h-8" />,
            title: "Secure Payment",
            description: "Multiple payment options with bank-level security",
            features: [
                "Credit & Debit cards",
                "Digital wallets",
                "Buy now, pay later",
                "SSL encrypted transactions"
            ]
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-primary text-white py-6">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold text-center">Our Services</h1>
                    <p className="text-center mt-2 text-white">Everything you need for a seamless shopping experience</p>
                </div>
            </header>

            {/* Main Services Section */}
            <main className="container mx-auto px-4 py-12">
                {/* Service Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {Object.entries(services).map(([key, service]) => (
                        <button
                            key={key}
                            onClick={() => setActiveService(key)}
                            className={`flex items-center gap-3 px-6 py-4 rounded-lg transition-all duration-300 ${
                                activeService === key
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-gray-50 text-gray-700 hover:bg-orange-50'
                            }`}
                        >
                            {service.icon}
                            <span className="font-medium">{service.title}</span>
                        </button>
                    ))}
                </div>

                {/* Active Service Details */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 text-primary rounded-full mb-4">
                                {services[activeService].icon}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {services[activeService].title}
                            </h2>
                            <p className="text-gray-600 text-lg">
                                {services[activeService].description}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {services[activeService].features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    <span className="text-gray-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Services Grid */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Secure Shopping</h3>
                        <p className="text-gray-600 text-sm">Your data and payments are protected with industry-standard encryption</p>
                    </div>

                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-orange-400 rounded-full mb-4">
                            <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">24/7 Support</h3>
                        <p className="text-gray-600 text-sm">Our customer service team is available round the clock to help you</p>
                    </div>

                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full mb-4">
                            <Package className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">Easy Returns</h3>
                        <p className="text-gray-600 text-sm">Hassle-free returns within 30 days of purchase, no questions asked</p>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-16 bg-orange-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h3>
                    <p className="text-gray-600 mb-6">Our friendly team is here to assist you with any questions</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#" className="flex items-center gap-2 bg-white px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                            <Phone className="w-5 h-5" />
                            <span>Call Us</span>
                        </a>
                        <a href="#" className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary transition-colors">
                            <Mail className="w-5 h-5" />
                            <span>Email Support</span>
                        </a>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">© 2024 Your Ecommerce Store. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default EcommerceServices;