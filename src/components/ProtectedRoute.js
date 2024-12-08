import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token'); // You can use any method to check authentication

  if (!token) {
    // If no token is found, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token is found, render the component
  return Component;
};

export default ProtectedRoute;
