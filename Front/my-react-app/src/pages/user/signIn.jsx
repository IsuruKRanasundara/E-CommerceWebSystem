import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { login, clearError, clearSuccess } from '@/store/userSlice.js';

// Mock AuthLayout component
const AuthLayout = ({ children }) => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            {children}
        </div>
    </div>
);

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 👇 selector path must match store reducer key
    const { loading, error, success, isAuthenticated } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    // Redirect if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/signIn');
        }
    }, [isAuthenticated, navigate]);

    // Handle successful login
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(clearSuccess());
                navigate('/');
            }, 1500);
        }
    }, [success, dispatch, navigate]);

    // Clear errors when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    // Form validation
    const validateForm = (data) => {
        const errors = {};
        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!data.password) {
            errors.password = "Password is required";
        } else if (data.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        dispatch(clearError());

        // 👇 use login action from userSlice
        dispatch(login({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
        }));
    };

    const handleSocialLogin = (provider) => {
        console.log(`Attempting to sign in with ${provider}`);
        dispatch(clearError());
    };

    return (
        <AuthLayout>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-orange-200 animate-in slide-in-from-left-5 duration-700">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <LogIn className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to your account to continue</p>
                </div>

                {/* Message Display */}
                {(error || success) && (
                    <div
                        className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                            success
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                        role="alert"
                        aria-live="polite"
                    >
                        {success ? (
                            <CheckCircle className="h-5 w-5 flex-shrink-0" />
                        ) : (
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium">
              {success ? 'Login successful! Redirecting...' : error}
            </span>
                    </div>
                )}

                {/* Social Login */}
                <div className="space-y-3 mb-6">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        disabled={loading}
                        className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all duration-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        Continue with Google
                    </button>
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('facebook')}
                        disabled={loading}
                        className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all duration-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    >
                        Continue with Facebook
                    </button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or sign in with email</span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={loading}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-orange-600 text-white rounded-lg"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
}
