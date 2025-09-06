import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthService from '../../service/authService';
import { setUserFromStorage } from '../../store/userSlice';

const SamlCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState('processing');

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const token = searchParams.get('token');
                const success = searchParams.get('success');
                const error = searchParams.get('error');

                if (error) {
                    setStatus('error');
                    setTimeout(() => navigate('/signIn?error=' + error), 3000);
                    return;
                }

                if (success === 'true' && token) {
                    const result = await AuthService.handleSamlCallback(token);

                    if (result.success) {
                        dispatch(setUserFromStorage());
                        setStatus('success');
                        setTimeout(() => navigate('/'), 2000);
                    } else {
                        setStatus('error');
                        setTimeout(() => navigate('/signIn?error=callback_failed'), 3000);
                    }
                } else {
                    setStatus('error');
                    setTimeout(() => navigate('/signIn?error=invalid_callback'), 3000);
                }
            } catch (error) {
                console.error('SAML callback error:', error);
                setStatus('error');
                setTimeout(() => navigate('/signIn?error=callback_error'), 3000);
            }
        };

        handleCallback();
    }, [searchParams, navigate, dispatch]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                {status === 'processing' && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Processing SAML Response</h2>
                        <p className="text-gray-600">Please wait while we authenticate you...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="text-green-500 text-5xl mb-4">✓</div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Successful</h2>
                        <p className="text-gray-600">Redirecting to dashboard...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="text-red-500 text-5xl mb-4">✗</div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Authentication Failed</h2>
                        <p className="text-gray-600">Redirecting to login page...</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default SamlCallback;