import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { authApi, type RegisterDto, type LoginDto, type AuthResponse } from '../services/authApi';

interface ErrorResponse {
  message?: string;
}

interface UseAuthReturn {
  loading: boolean;
  error: string | null;
  login: (identifier: string, password: string, rememberMe: boolean) => Promise<void>;
  register: (username: string, email: string, password: string, rememberMe: boolean) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuthSuccess = useCallback((data: AuthResponse, rememberMe: boolean) => {
    authApi.setAuthData(data, rememberMe);
    // Redirect to dashboard or home
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  const handleError = useCallback((err: AxiosError<ErrorResponse>) => {
    let message = 'An unexpected error occurred';
    
    if (err.response?.data?.message) {
      message = err.response.data.message;
    } else if (err.message) {
      message = err.message;
    }
    
    setError(message);
    setLoading(false);
  }, []);

  const login = useCallback(async (
    identifier: string, 
    password: string, 
    rememberMe: boolean
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Determine if identifier is email or username
      const isEmail = identifier.includes('@');
      const loginData: LoginDto = isEmail 
        ? { email: identifier, password }
        : { username: identifier, password };

      const response = await authApi.login(loginData);
      await handleAuthSuccess(response, rememberMe);
    } catch (err) {
      handleError(err as AxiosError<ErrorResponse>);
    }
  }, [handleAuthSuccess, handleError]);

  const register = useCallback(async (
    username: string,
    email: string, 
    password: string, 
    rememberMe: boolean
  ) => {
    setLoading(true);
    setError(null);

    try {
      const registerData: RegisterDto = {
        username,
        email,
        password,
      };

      const response = await authApi.register(registerData);
      await handleAuthSuccess(response, rememberMe);
    } catch (err) {
      handleError(err as AxiosError<ErrorResponse>);
    }
  }, [handleAuthSuccess, handleError]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    login,
    register,
    clearError,
  };
};