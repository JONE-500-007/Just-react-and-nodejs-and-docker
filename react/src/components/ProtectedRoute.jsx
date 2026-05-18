// ============================================================
//  ProtectedRoute.jsx
//  Wraps protected pages — redirects to /login if no user.
//  Shows nothing while restoring session from localStorage.
//
//  Usage in App.jsx:
//    <Route path="/dashboard" element={
//      <ProtectedRoute><EmployeeDashboard /></ProtectedRoute>
//    } />
// ============================================================

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait for session restore before deciding
  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}