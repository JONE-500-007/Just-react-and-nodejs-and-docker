// ============================================================
//  App.jsx — Root component
//  Sets up React Router v6 + AuthProvider
//
//  Routes:
//    /              → redirect to /login
//    /login         → Login page (public)
//    /register      → Register page (public)
//    /dashboard     → EmployeeDashboard (protected)
//    /head-dashboard → HeadDashboard (protected) — ยังไม่ได้ใช้ role check
// ============================================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute   from './components/ProtectedRoute';

import Login              from './pages/Login';
import Register           from './pages/Register';
import EmployeeDashboard  from './pages/EmployeeDashboard';
import HeadDashboard      from './pages/HeadDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <EmployeeDashboard />
            </ProtectedRoute>
          } />

          <Route path="/head-dashboard" element={
            <ProtectedRoute>
              <HeadDashboard />
            </ProtectedRoute>
          } />

          {/* Default → login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}