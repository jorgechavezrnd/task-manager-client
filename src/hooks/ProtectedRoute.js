import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return <></>;
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return children;
};

export default ProtectedRoute;
