'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, Award, Truck, Heart, Star, ArrowRight, Globe, Shield, Zap } from 'lucide-react';

const AboutUsPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        setIsVisible(true);
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const stats = [
        { icon: ShoppingBag, number: '100K+', label: 'Products Sold', color: 'text-orange-500' },
        { icon: Users, number: '50K+', label: 'Happy Customers', color: 'text-orange-600' },
        { icon: Award, number: '15+', label: 'Awards Won', color: 'text-orange-500' },
        { icon: Globe, number: '25+', label: 'Countries Served', color: 'text-orange-600' }
    ];

    const features = [
        {
            icon: Truck,
            title: 'Fast Delivery',
            description: 'Lightning-fast shipping with real-time tracking across all major cities.'
        },
        {
            icon: Shield,
            title: 'Secure Shopping',
            description: 'Bank-grade security ensuring your personal information stays protected.'
        },
        {
            icon: Heart,
            title: '24/7 Support',
            description: 'Round-the-clock customer support ready to help with any questions.'
        },
        {
            icon: Zap,
            title: 'Premium Quality',
            description: 'Curated selection of high-quality products from trusted brands worldwide.'
        }
    ];

    const testimonials = [
        {
            name: 'Sarah Johnson',
            role: 'Fashion Enthusiast',
            content: 'Amazing shopping experience! The quality exceeded my expectations and delivery was super fast.',
            rating: 5
        },
        {
            name: 'Mike Chen',
            role: 'Tech Professional',
            content: 'Best customer service I\'ve experienced. They really care about their customers\' satisfaction.',
            rating: 5
        },
        {
            name: 'Emma Rodriguez',
            role: 'Small Business Owner',
            content: 'Reliable platform with incredible product variety. My go-to place for business supplies.',
            rating: 5
        }
    ];

    const teamMembers = [
        {
            name: 'Alex Thompson',
            role: 'CEO & Founder',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
        },
        {
            name: 'Maria Garcia',
            role: 'Head of Operations',
            image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face'
        },
        {
            name: 'David Kim',
            role: 'Tech Lead',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className={`text-center transform transition-all duration-1000 ${
                        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            About <span className="text-orange-100">Our Story</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                            Revolutionizing e-commerce with passion, innovation, and an unwavering commitment to customer satisfaction.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-8 py-4">
                                <p className="text-white font-semibold">Est. 2020 • Trusted by millions</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-10 animate-bounce">
                    <div className="w-16 h-16 bg-white/20 rounded-full"></div>
                </div>
                <div className="absolute bottom-20 right-10 animate-pulse">
                    <div className="w-12 h-12 bg-orange-300/30 rounded-full"></div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors duration-300">
                                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Our <span className="text-orange-500">Mission</span>
                            </h2>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                We believe shopping should be effortless, enjoyable, and accessible to everyone. Our mission is to create
                                a seamless e-commerce experience that connects people with the products they love while supporting
                                businesses of all sizes.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                                    <span className="text-gray-700 font-medium">Customer-first approach in everything we do</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                                    <span className="text-gray-700 font-medium">Supporting sustainable and ethical business practices</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-4"></div>
                                    <span className="text-gray-700 font-medium">Innovation through technology and user experience</span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                <div className="bg-white rounded-2xl p-8 transform -rotate-3">
                                    <div className="text-6xl mb-4">🚀</div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Innovation First</h3>
                                    <p className="text-gray-600">
                                        Constantly pushing boundaries to deliver cutting-edge shopping experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose <span className="text-orange-500">Us?</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We're not just another e-commerce platform. We're your trusted partner in creating exceptional shopping experiences.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="group bg-orange-50 rounded-2xl p-8 hover:bg-orange-100 transition-all duration-300 hover:transform hover:scale-105">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-2xl mb-6 group-hover:bg-orange-600 transition-colors duration-300">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gradient-to-b from-orange-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Meet Our <span className="text-orange-500">Team</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            The passionate individuals behind our success, working tirelessly to bring you the best shopping experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group text-center">
                                <div className="relative mb-6 inline-block">
                                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-orange-200 group-hover:border-orange-400 transition-colors duration-300">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                                        {member.role}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-gray-600">Leading with vision and dedication</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            What Our <span className="text-orange-500">Customers</span> Say
                        </h2>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12 text-white">
                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                                        <Star key={i} className="w-6 h-6 text-orange-200 fill-current" />
                                    ))}
                                </div>
                                <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                                    "{testimonials[activeTestimonial].content}"
                                </blockquote>
                                <div>
                                    <div className="font-bold text-lg">{testimonials[activeTestimonial].name}</div>
                                    <div className="text-orange-200">{testimonials[activeTestimonial].role}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                        index === activeTestimonial ? 'bg-orange-500' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Start Your Journey?
                    </h2>
                    <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and experience the future of online shopping today.
                    </p>
                    <button className="inline-flex items-center bg-white text-orange-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-orange-50 transition-colors duration-300 group">
                        Explore Our Products
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
