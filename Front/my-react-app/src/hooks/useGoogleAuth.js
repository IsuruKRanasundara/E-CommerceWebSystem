// src/hooks/useGoogleAuth.js
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice.js';
import authService from '../service/authService';

export function useGoogleAuth() {
    const dispatch = useDispatch();

    const handleGoogleSuccess = useCallback(async (credentialResponse) => {
        try {
            const result = await authService.googleAuth(credentialResponse.credential);
            dispatch(setUser(result.user));
            return { success: true, user: result.user };
        } catch (error) {
            console.error('Google auth error:', error);
            return { success: false, error: error.message };
        }
    }, [dispatch]);

    const handleGoogleError = useCallback(() => {
        console.error('Google Sign-In was unsuccessful');
        return { success: false, error: 'Google Sign-In failed' };
    }, []);

    return {
        handleGoogleSuccess,
        handleGoogleError,
    };
}