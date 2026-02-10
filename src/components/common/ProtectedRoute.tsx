import React from 'react';
import { Navigate } from 'react-router-dom';
import { authApi } from '../../services/authApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = authApi.getAccessToken() && authApi.getUser();

  if (!isAuthenticated) {
    // Redirect to auth page with login mode
    return <Navigate to="/auth?mode=login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;