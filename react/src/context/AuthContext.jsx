// ============================================================
//  AuthContext.jsx
//  Global authentication state via React Context.
//
//  Provides:
//    user        — current user object | null
//    login()     — POST /api/auth/login  → saves user to state + localStorage
//    logout()    — clears state + localStorage → redirect to /login
//    register()  — POST /api/auth/register
//    loading     — true while restoring session from localStorage
//
//  Usage:
//    const { user, login, logout } = useAuth()
// ============================================================

import React, { createContext, useContext, useState, useEffect } from 'react';

const API = 'http://localhost:3000/api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);   // restoring session

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ws_user');
      if (saved) setUser(JSON.parse(saved));
    } catch {
      localStorage.removeItem('ws_user');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── LOGIN ──────────────────────────────────────────────────
  // Returns: { ok: true, user } | { ok: false, error: string }
  const login = async (email, password) => {
    try {
      const res  = await fetch(`${API}/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) return { ok: false, error: data.error ?? 'Login failed' };

      setUser(data);
      localStorage.setItem('ws_user', JSON.stringify(data));
      return { ok: true, user: data };
    } catch {
      return { ok: false, error: 'ไม่สามารถเชื่อมต่อ Server ได้' };
    }
  };

  // ── REGISTER ──────────────────────────────────────────────
  // Returns: { ok: true } | { ok: false, error: string }
  const register = async (user_name, email, password) => {
    try {
      const res  = await fetch(`${API}/register`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ user_name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) return { ok: false, error: data.error ?? 'Register failed' };
      return { ok: true };
    } catch {
      return { ok: false, error: 'ไม่สามารถเชื่อมต่อ Server ได้' };
    }
  };

  // ── LOGOUT ────────────────────────────────────────────────
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ws_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Convenience hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}