import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Award, ShieldCheck, Smile, Users } from 'lucide-react';

export default function About() {
    const [hoveredCard, setHoveredCard] = useState(null);

    const values = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-primary" />,
            title: "Trusted Quality",
            description: "We ensure every product meets the highest standards of quality and reliability.",
            bgColor: "bg-orange-50"
        },
        {
            icon: <Smile className="w-8 h-8 text-green-600" />,
            title: "Customer Satisfaction",
            description: "Our customers are at the heart of everything we do, and we strive to exceed expectations.",
            bgColor: "bg-green-50"
        },
        {
            icon: <Award className="w-8 h-8 text-orange-600" />,
            title: "Award-Winning Service",
            description: "Recognized for excellence in customer service and product innovation.",
            bgColor: "bg-orange-50"
        },
        {
            icon: <Users className="w-8 h-8 text-purple-600" />,
            title: "Community Focused",
            description: "We value our community and work to create meaningful connections.",
            bgColor: "bg-purple-50"
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-primary text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            About Us
                        </h1>
                        <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-8">
                            Discover the story behind our brand and why thousands of customers trust us for their shopping needs.
                        </p>
                        <button className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300">
                            Shop Now
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            Our Story
                        </h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Founded with a vision to bring high-quality products to customers worldwide, we started as a small team passionate about innovation and customer satisfaction.
                            </p>
                            <p>
                                Over the years, we've grown into a trusted brand known for exceptional service, premium products, and a commitment to excellence.
                            </p>
                            <p>
                                Today, we serve thousands of happy customers, offering a wide range of products tailored to meet diverse needs.
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8">
                        <div className="grid grid-cols-2 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                                <div className="text-gray-600">Happy Customers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                                <div className="text-gray-600">Products</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-2">25+</div>
                                <div className="text-gray-600">Countries</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-primary mb-2">99%</div>
                                <div className="text-gray-600">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            Why Choose Us
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our commitment to quality, trust, and customer satisfaction sets us apart.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer border border-gray-100"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 ${value.bgColor} rounded-lg mb-4`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">orange
                    Ready to Shop?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                    Explore our wide range of products and find what you need today.
                </p>
                <button className="inline-flex items-center px-12 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors duration-300 text-lg">
                    Start Shopping
                    <ShoppingCart className="ml-2 w-5 h-5" />
                </button>
            </div>
        </div>
    );
}