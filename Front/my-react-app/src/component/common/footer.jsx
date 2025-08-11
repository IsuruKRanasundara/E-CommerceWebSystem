import React from 'react';
import { Facebook, MessageCircle, Mail, Phone, MapPin, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-orange-50 border-t border-orange-200">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-orange-900">ShopEasy</h3>
                        <p className="text-orange-700 text-sm leading-relaxed">
                            Your trusted online shopping destination for quality products at great prices. We deliver happiness to your doorstep.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://wa.me/your-number"
                                className="bg-orange-100 hover:bg-orange-200 p-2 rounded-full transition-colors duration-200"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="h-5 w-5 text-green-600" />
                            </a>
                            <a
                                href="https://facebook.com/yourpage"
                                className="bg-orange-100 hover:bg-orange-200 p-2 rounded-full transition-colors duration-200"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5 text-blue-600" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-orange-900">Quick Links</h4>
                        <ul className="space-y-2">
                            {['About Us', 'Contact', 'FAQ', 'Blog', 'Careers'].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-orange-700 hover:text-orange-900 text-sm transition-colors duration-200"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-orange-900">Customer Service</h4>
                        <ul className="space-y-2">
                            {[
                                'Track Your Order',
                                'Returns & Exchanges',
                                'Shipping Info',
                                'Size Guide',
                                'Privacy Policy',
                                'Terms of Service'
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href="#"
                                        className="text-orange-700 hover:text-orange-900 text-sm transition-colors duration-200"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-orange-900">Get in Touch</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-orange-600" />
                                <span className="text-orange-700 text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-orange-600" />
                                <span className="text-orange-700 text-sm">support@shopeasy.com</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-4 w-4 text-orange-600 mt-0.5" />
                                <span className="text-orange-700 text-sm leading-relaxed">
                  123 Commerce St.<br />
                  Business District<br />
                  New York, NY 10001
                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-12 pt-8 border-t border-orange-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-100 p-2 rounded-full">
                                <Truck className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <h5 className="font-medium text-orange-900 text-sm">Free Shipping</h5>
                                <p className="text-orange-700 text-xs">On orders over $50</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-100 p-2 rounded-full">
                                <RotateCcw className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <h5 className="font-medium text-orange-900 text-sm">Easy Returns</h5>
                                <p className="text-orange-700 text-xs">30-day return policy</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-100 p-2 rounded-full">
                                <Shield className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <h5 className="font-medium text-orange-900 text-sm">Secure Payment</h5>
                                <p className="text-orange-700 text-xs">SSL encrypted checkout</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="bg-orange-100 p-2 rounded-full">
                                <CreditCard className="h-5 w-5 text-orange-600" />
                            </div>
                            <div>
                                <h5 className="font-medium text-orange-900 text-sm">Multiple Payment</h5>
                                <p className="text-orange-700 text-xs">Cards, PayPal & more</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div className="mt-12 pt-8 border-t border-orange-200">
                    <div className="max-w-md mx-auto text-center lg:text-left lg:mx-0">
                        <h4 className="text-lg font-semibold text-orange-900 mb-2">Stay Updated</h4>
                        <p className="text-orange-700 text-sm mb-4">Subscribe to get special offers and updates</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-sm"
                            />
                            <button className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-orange-100 border-t border-orange-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
                        <p className="text-orange-700 text-sm">
                            © 2024 ShopEasy. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-orange-700 hover:text-orange-900 text-sm transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-orange-700 hover:text-orange-900 text-sm transition-colors duration-200">
                                Terms of Use
                            </a>
                            <a href="#" className="text-orange-700 hover:text-orange-900 text-sm transition-colors duration-200">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;