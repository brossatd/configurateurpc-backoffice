import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  const decoded = jwtDecode(token);
  return decoded.isAdmin ? children : <Navigate to="/" />;
}

export default AdminRoute;