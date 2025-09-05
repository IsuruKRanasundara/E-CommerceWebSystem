// src/component/AuthStatus.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

export function AuthStatus() {
    const { user, isAuthenticated, logout } = useAuth();

    if (!isAuthenticated) {
        return <div className="auth-status">Not signed in</div>;
    }

    return (
        <div className="auth-status">
            <span>Welcome, {user?.email || user?.name || 'User'}</span>
            <button onClick={logout} className="logout-btn">
                Logout
            </button>
        </div>
    );
}