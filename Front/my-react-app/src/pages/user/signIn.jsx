import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";
import { loginUser, clearError, clearSuccess } from '../../store/userSlice';

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
    const { loading, error, success, isAuthenticated } = useSelector((state) => state.user);

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
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Handle successful login
    useEffect(() => {
        if (success) {
            setTimeout(() => {
                dispatch(clearSuccess());
                navigate('/'); // Redirect to home page
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

        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }

        // Clear global error when user starts typing
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

        // Clear any existing errors
        dispatch(clearError());

        // Dispatch login action
        dispatch(loginUser({
            email: formData.email.trim().toLowerCase(),
            password: formData.password
        }));
    };

    const handleSocialLogin = async (provider) => {
        console.log(`Attempting to sign in with ${provider}`);
        // In a real app, this would redirect to OAuth provider
        // For now, just show a message
        dispatch(clearError());
        // You can implement social login here
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
                    <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                        success
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                    }`} role="alert" aria-live="polite">
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

                {/* Social Login Buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('google')}
                        disabled={loading}
                        className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all duration-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        aria-label="Sign in with Google"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" aria-hidden="true">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        onClick={() => handleSocialLogin('facebook')}
                        disabled={loading}
                        className="w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 hover:shadow-md transition-all duration-200 bg-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        aria-label="Sign in with Facebook"
                    >
                        <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
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

                {/* Sign In Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email address"
                                className={`w-full h-12 pl-10 pr-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition-all duration-200 outline-none ${
                                    errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-600'
                                }`}
                                aria-invalid={errors.email ? 'true' : 'false'}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                disabled={loading}
                            />
                        </div>
                        {errors.email && (
                            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                className={`w-full h-12 pl-10 pr-12 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 transition-all duration-200 outline-none ${
                                    errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-orange-600'
                                }`}
                                aria-invalid={errors.password ? 'true' : 'false'}
                                aria-describedby={errors.password ? 'password-error' : undefined}
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors focus:outline-none focus:text-orange-600"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                disabled={loading}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                                disabled={loading}
                            />
                            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <Link
                            to="/forgot-password"
                            className="text-sm text-orange-600 hover:text-orange-700 hover:underline focus:outline-none focus:underline transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <span>Sign In</span>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-orange-600 hover:text-orange-700 font-medium hover:underline focus:outline-none focus:underline transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* Additional Links */}
                <div className="mt-6 text-center space-y-2">
                    <div className="flex justify-center space-x-4 text-xs text-gray-500">
                        <Link
                            to="/terms"
                            className="hover:text-orange-600 transition-colors focus:outline-none focus:text-orange-600"
                        >
                            Terms of Service
                        </Link>
                        <span>•</span>
                        <Link
                            to="/privacy"
                            className="hover:text-orange-600 transition-colors focus:outline-none focus:text-orange-600"
                        >
                            Privacy Policy
                        </Link>
                        <span>•</span>
                        <Link
                            to="/help"
                            className="hover:text-orange-600 transition-colors focus:outline-none focus:text-orange-600"
                        >
                            Help
                        </Link>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}