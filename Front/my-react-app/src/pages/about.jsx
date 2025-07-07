import React, { useState } from 'react';
import { ChevronRight, ShoppingCart, Award, ShieldCheck, Smile, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function About() {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState(null);

    const values = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
            title: "Trusted Quality",
            description: "We ensure every product meets the highest standards of quality and reliability.",
            bgColor: "bg-blue-50"
        },
        {
            icon: <Smile className="w-8 h-8 text-green-600" />,
            title: "Customer Satisfaction",
            description: "Our customers are at the heart of everything we do, and we strive to exceed expectations.",
            bgColor: "bg-green-50"
        },
        {
            icon: <Award className="w-8 h-8 text-yellow-600" />,
            title: "Award-Winning Service",
            description: "Recognized for excellence in customer service and product innovation.",
            bgColor: "bg-yellow-50"
        },
        {
            icon: <Users className="w-8 h-8 text-purple-600" />,
            title: "Community Focused",
            description: "We value our community and work to create meaningful connections.",
            bgColor: "bg-purple-50"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-700 via-orange-500 to-orange-700">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 animate-pulse"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            About Us
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            Discover the story behind our brand and why thousands of customers trust us for their shopping needs.
                        </p>
                        <div className="mt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                            <button onClick={() => navigate('/')} className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold rounded-full hover:from-orange-700 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                                Shop Now
                                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our Story
                        </h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
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
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-yellow-600/30 rounded-3xl transform rotate-3 animate-pulse"></div>
                        <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-orange-500/20">
                            <div className="grid grid-cols-2 gap-8 text-center">
                                <div>
                                    <div className="text-4xl font-bold text-orange-400 mb-2">10K+</div>
                                    <div className="text-gray-400">Happy Customers</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
                                    <div className="text-gray-400">Products</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-red-400 mb-2">25+</div>
                                    <div className="text-gray-400">Countries</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold text-green-400 mb-2">99%</div>
                                    <div className="text-gray-400">Satisfaction</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Why Choose Us
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Our commitment to quality, trust, and customer satisfaction sets us apart.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className={`group relative p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                                hoveredCard === index ? 'shadow-2xl shadow-orange-500/25' : ''
                            }`}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-yellow-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="text-orange-400 mb-4 group-hover:text-orange-300 transition-colors">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-300 transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {value.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to Shop?
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                    Explore our wide range of products and find what you need today.
                </p>
                <button onClick={() => navigate('/')} className="group inline-flex items-center px-12 py-4 bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-semibold rounded-full hover:from-orange-700 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-lg">
                    Start Shopping
                    <ShoppingCart className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
