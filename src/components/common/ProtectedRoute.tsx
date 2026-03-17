import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED !== 'false';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Bypass auth in development when VITE_AUTH_ENABLED=false
  if (!AUTH_ENABLED) {
    return <>{children}</>;
  }

  if (loading) {
    return <LoadingSpinner fullScreen message="Checking session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  // Check for onboarding
  const onboardingCompleted = user?.profile?.onboardingCompleted;
  if (typeof onboardingCompleted !== 'boolean') {
    return <LoadingSpinner fullScreen message="Loading profile..." />;
  }

  if (!onboardingCompleted && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;