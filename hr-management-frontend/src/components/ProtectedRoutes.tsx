import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
