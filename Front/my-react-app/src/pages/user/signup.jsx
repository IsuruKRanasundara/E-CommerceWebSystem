import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ShoppingBag, AlertCircle, CheckCircle, Facebook, Chrome, Phone, MapPin } from 'lucide-react';
import { registerUser, clearError, clearSuccess, googleAuth } from '@/store/userSlice.js';
import {API_ENDPOINTS} from "@/utils/constants.js";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success, isAuthenticated } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            postalCode: ''
        },
        agreeToTerms: false
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Redirect if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redirect to home if already authenticated
        }
    }, [isAuthenticated, navigate]);

    // Handle successful registration
    useEffect(() => {
        if (success) {
            // Clear the success state after a delay
            setTimeout(() => {
                dispatch(clearSuccess());
                navigate('/signIn'); // Redirect to sign in page for verification
            }, 2000);
        }
    }, [success, dispatch, navigate]);

    // Clear errors when component unmounts or form changes
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const validateForm = () => {
        const newErrors = {};

        // Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        // First name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        // Last name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Phone validation (optional but if provided should be valid)
        if (formData.phone && !/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        // Terms validation
        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Clear global error when user types
        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Clear any existing errors
        dispatch(clearError());

        // Prepare user data for submission
        const userData = {
            username: formData.username.trim(),
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            phone: formData.phone.trim(),
        };

        // Only include address if at least one field is filled
        const addressFields = Object.values(formData.address).filter(field => field.trim());
        if (addressFields.length > 0) {
            userData.address = {
                street: formData.address.street.trim(),
                city: formData.address.city.trim(),
                state: formData.address.state.trim(),
                postalCode: formData.address.postalCode.trim()
            };
        }

        // Dispatch the register action
        dispatch(registerUser(userData));
    };

    const handleSocialLogin = async () => {
        dispatch(clearError());
        try {
            // Replace this with real Google OAuth logic
            const googleToken = await window.AuthService.getGoogleToken(); // Or import AuthService if available
            if (googleToken) {
                dispatch(googleAuth(googleToken));
            }
        } catch (err) {
            // Handle error
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-orange-600 p-3 rounded-full">
                            <ShoppingBag className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Join Our Store</h1>
                    <p className="text-gray-600">Create your account and start shopping</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
                    {/* Message Display */}
                    {(error || success) && (
                        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
                            success
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                        }`}>
                            {success ? (
                                <CheckCircle className="h-5 w-5 flex-shrink-0" />
                            ) : (
                                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            )}
                            <span className="text-sm">
                {success ? 'Account created successfully! Please check your email to verify your account.' : error}
              </span>
                        </div>
                    )}

                    {/* Social Login Buttons */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={() => handleSocialLogin('Google')}
                            className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            type="button"
                            disabled={loading}
                        >
                            <Chrome className="h-5 w-5 text-red-500" />
                            <span className="text-gray-700 font-medium">Continue with Google</span>
                        </button>


                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                Username *
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                        errors.username ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your username"
                                    aria-describedby={errors.username ? 'username-error' : undefined}
                                    disabled={loading}
                                />
                            </div>
                            {errors.username && (
                                <p id="username-error" className="text-red-500 text-xs mt-1" role="alert">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name *
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="First name"
                                    disabled={loading}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs mt-1" role="alert">
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name *
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Last name"
                                    disabled={loading}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs mt-1" role="alert">
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your email address"
                                    aria-describedby={errors.email ? 'email-error' : undefined}
                                    disabled={loading}
                                />
                            </div>
                            {errors.email && (
                                <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Phone Field */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number (Optional)
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                        errors.phone ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter your phone number"
                                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                                    disabled={loading}
                                />
                            </div>
                            {errors.phone && (
                                <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">
                                    {errors.phone}
                                </p>
                            )}
                        </div>

                        {/* Address Fields */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                Address (Optional)
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    name="address.street"
                                    type="text"
                                    value={formData.address.street}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="Street Address"
                                    disabled={loading}
                                />
                                <input
                                    name="address.city"
                                    type="text"
                                    value={formData.address.city}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="City"
                                    disabled={loading}
                                />
                                <input
                                    name="address.state"
                                    type="text"
                                    value={formData.address.state}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="State"
                                    disabled={loading}
                                />
                                <input
                                    name="address.postalCode"
                                    type="text"
                                    value={formData.address.postalCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    placeholder="Postal Code"
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Create a password"
                                    aria-describedby={errors.password ? 'password-error' : undefined}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p id="password-error" className="text-red-500 text-xs mt-1" role="alert">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password *
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Confirm your password"
                                    aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p id="confirmPassword-error" className="text-red-500 text-xs mt-1" role="alert">
                                    {errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div>
                            <label className="flex items-start gap-2">
                                <input
                                    name="agreeToTerms"
                                    type="checkbox"
                                    checked={formData.agreeToTerms}
                                    onChange={handleInputChange}
                                    className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                    aria-describedby={errors.agreeToTerms ? 'terms-error' : undefined}
                                    disabled={loading}
                                />
                                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                                    <Link to="/terms" className="text-orange-600 hover:text-orange-700 underline">
                    Terms of Service
                  </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-orange-600 hover:text-orange-700 underline">
                    Privacy Policy
                  </Link>
                </span>
                            </label>
                            {errors.agreeToTerms && (
                                <p id="terms-error" className="text-red-500 text-xs mt-1" role="alert">
                                    {errors.agreeToTerms}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}

                            className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Creating Account...
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Sign In Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/signIn" className="text-orange-600 hover:text-orange-700 font-medium underline">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;

