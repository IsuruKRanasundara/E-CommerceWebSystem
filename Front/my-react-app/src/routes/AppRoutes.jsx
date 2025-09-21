import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, setUserFromStorage } from '../store/userSlice';
import { fetchCart } from '../store/cartSlice';

// Import route components
import UserRoutes from './userRoutes';
import AdminRoutes from './adminRoutes';
import AuthRoutes from './AuthRoutes.jsx';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        return <AuthRoutes />;
    }

    if (requireAdmin && user?.role !== 'admin') {
        return <UserRoutes />;
    }

    return children;
};

const AppRoutes = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        // Check for existing token on app load
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            dispatch(setUserFromStorage());
            dispatch(verifyToken(token));
        }
    }, [dispatch]);

    useEffect(() => {
        // Fetch cart when user is authenticated
        if (isAuthenticated) {
            dispatch(fetchCart());
        }
    }, [isAuthenticated, dispatch]);

    return (
        <Routes>
            {/* Authentication Routes */}
            <Route path="/signIn" element={<AuthRoutes />} />
            <Route path="/signUp" element={<AuthRoutes />} />
            <Route path="/auth/*" element={<AuthRoutes />} />

            {/* Admin Routes */}
            <Route path="/admin/*" element={
                <ProtectedRoute requireAdmin={true}>
                    <AdminRoutes />
                </ProtectedRoute>
            } />

            {/* User Routes */}
            <Route path="/*" element={
                <ProtectedRoute>
                    <UserRoutes />
                </ProtectedRoute>
            } />
        </Routes>
    );
};

export default AppRoutes;
