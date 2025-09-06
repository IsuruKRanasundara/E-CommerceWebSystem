import { useDispatch, useSelector } from 'react-redux';
import {
    setUser,
    clearUser,
    setLoading,
    setError,
    selectCurrentUser,
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError,
    logoutUser as logoutAction
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
        dispatch(logoutAction());
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

// Additional hook for logout functionality
export function useLogout() {
    const dispatch = useDispatch();

    return {
        mutateAsync: async () => {
            dispatch(logoutAction());
        },
        isPending: false
    };
}