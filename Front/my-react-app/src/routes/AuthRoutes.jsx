import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from '../pages/user/signIn';
import SignUp from '../pages/user/signup';
import SamlCallback from '../pages/auth/SamlCallBack';

const AuthRoutes = () => {
    const { isAuthenticated } = useSelector((state) => state.user);

    // If user is already authenticated, redirect to main app
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/auth/callback" element={<SamlCallback />} />
                <Route path="*" element={<Navigate to="/signIn" replace />} />
            </Routes>
        </div>
    );
};

export default AuthRoutes;