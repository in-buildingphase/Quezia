import React from 'react';
import { Navigate } from 'react-router-dom';
import { authApi } from '../../services/authApi';

const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED !== 'false';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Bypass auth in development when VITE_AUTH_ENABLED=false
  if (!AUTH_ENABLED) {
    return <>{children}</>;
  }

  const isAuthenticated = authApi.getAccessToken() && authApi.getUser();

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;