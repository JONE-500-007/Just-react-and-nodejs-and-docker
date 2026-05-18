// ============================================================
//  Login.jsx
//  Login page — POST /api/auth/login
//  On success → navigate to /dashboard
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function Login() {
  const { login }   = useAuth();
  const navigate    = useNavigate();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('กรุณากรอก Email และ Password');
      return;
    }

    setLoading(true);
    const result = await login(form.email, form.password);
    console.log(result);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    // TODO: เมื่อมี role system → redirect ตาม role

    // เช็ค role แล้วค่อยไปหน้าที่ถูกต้อง
    if (result.user.role === 'head') {
      navigate('/head-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-name">WorkSpace</div>
          <span className="auth-brand-tag">Employee Portal</span>
        </div>

        {/* Title */}
        <div className="auth-title">เข้าสู่ระบบ</div>
        <div className="auth-subtitle">ยินดีต้อนรับกลับมา กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ</div>

        {/* Error */}
        {error && (
          <div className="auth-error" style={{ marginBottom: 16 }}>
            <i className="ti ti-alert-circle" aria-hidden="true"></i>
            {error}
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          <div className="auth-field">
            <label className="auth-label" htmlFor="email">Email</label>
            <div className="auth-input-wrap">
              <i className="ti ti-mail" aria-hidden="true"></i>
              <input
                id="email"
                name="email"
                type="email"
                className="auth-input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="password">Password</label>
            <div className="auth-input-wrap">
              <i className="ti ti-lock" aria-hidden="true"></i>
              <input
                id="password"
                name="password"
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          <button className="auth-btn" type="submit" disabled={loading}>
            {loading
              ? <><i className="ti ti-loader-2" aria-hidden="true"></i> กำลังเข้าสู่ระบบ...</>
              : <><i className="ti ti-login" aria-hidden="true"></i> เข้าสู่ระบบ</>
            }
          </button>
        </form>

        {/* Switch to register */}
        <div className="auth-divider">
          ยังไม่มีบัญชี?{' '}
          <Link className="auth-link" to="/register">สมัครสมาชิก</Link>
        </div>

      </div>
    </div>
  );
}