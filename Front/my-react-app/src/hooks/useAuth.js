// src/hooks/useAuth.js
import { useDispatch, useSelector } from 'react-redux';
import {
    setUser,
    clearUser,
    setLoading,
    setError,
    selectCurrentUser,
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError
} from '../store/userSlice.js';

export function useAuth() {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const isLoading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const login = async (userData) => {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            dispatch(setUser(userData));
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const logout = () => {
        dispatch(clearUser());
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout
    };
}