// ============================================================
//  Register.jsx
//  Register page — POST /api/auth/register
//  On success → navigate to /login (พร้อม success message)
// ============================================================

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

export default function Register() {
  const { register } = useAuth();
  const navigate     = useNavigate();

  const [form, setForm]       = useState({ user_name: '', email: '', password: '', confirm: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!form.user_name || !form.email || !form.password || !form.confirm) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Password ไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
      return;
    }
    if (form.password.length < 6) {
      setError('Password ต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    setLoading(true);
    const result = await register(form.user_name, form.email, form.password);
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    // Show success briefly then redirect
    setSuccess(true);
    setTimeout(() => navigate('/login'), 1800);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-name">WorkSpace</div>
          <span className="auth-brand-tag">Employee Portal</span>
        </div>

        {/* Success state */}
        {success ? (
          <div className="auth-success">
            <i className="ti ti-circle-check" aria-hidden="true"></i>
            สมัครสมาชิกสำเร็จ! กำลังพาไปหน้า Login...
          </div>
        ) : (
          <>
            <div className="auth-title">สมัครสมาชิก</div>
            <div className="auth-subtitle">สร้างบัญชีใหม่เพื่อเข้าใช้งานระบบ</div>

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
                <label className="auth-label" htmlFor="user_name">ชื่อผู้ใช้</label>
                <div className="auth-input-wrap">
                  <i className="ti ti-user" aria-hidden="true"></i>
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    className="auth-input"
                    placeholder="ชื่อ-นามสกุล หรือ username"
                    value={form.user_name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="อย่างน้อย 6 ตัวอักษร"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="confirm">ยืนยัน Password</label>
                <div className="auth-input-wrap">
                  <i className="ti ti-lock-check" aria-hidden="true"></i>
                  <input
                    id="confirm"
                    name="confirm"
                    type="password"
                    className="auth-input"
                    placeholder="กรอก Password อีกครั้ง"
                    value={form.confirm}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <button className="auth-btn" type="submit" disabled={loading}>
                {loading
                  ? <><i className="ti ti-loader-2" aria-hidden="true"></i> กำลังสมัคร...</>
                  : <><i className="ti ti-user-plus" aria-hidden="true"></i> สมัครสมาชิก</>
                }
              </button>
            </form>

            {/* Switch to login */}
            <div className="auth-divider">
              มีบัญชีอยู่แล้ว?{' '}
              <Link className="auth-link" to="/login">เข้าสู่ระบบ</Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}