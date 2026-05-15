// ============================================================
//  Topbar.jsx
//  Renders two topbars:
//    - .topbar         → desktop (hidden on mobile via CSS)
//    - .mobile-topbar  → mobile  (hidden on desktop via CSS)
//
//  Props:
//    name            string  — user display name (default "User")
//    role            string  — user role title   (default "Employee")
//    notifCount      number  — badge count        (default 0)
// ============================================================

import React from 'react';

export default function Topbar({ name = 'User', role = 'Employee', notifCount = 0 }) {
  const initials = name.substring(0, 2);

  return (
    <>
      {/* ── DESKTOP TOPBAR ── */}
      <header className="topbar">
        {/* Search */}
        <div className="search-wrap">
          <i className="ti ti-search" aria-hidden="true"></i>
          <input
            className="search-input"
            type="text"
            placeholder="ค้นหางาน, เพื่อนร่วมงาน..."
            aria-label="ค้นหา"
          />
        </div>

        {/* Right cluster */}
        <div className="topbar-right">
          <button className="notif-btn" aria-label={`การแจ้งเตือน ${notifCount} รายการ`}>
            <i className="ti ti-bell" aria-hidden="true"></i>
            {notifCount > 0 && <span className="badge">{notifCount}</span>}
          </button>

          <div className="avatar-wrap">
            <div className="avatar-info">
              <div className="avatar-name">{name}</div>
              <div className="avatar-role">{role}</div>
            </div>
            <div className="avatar-circle" aria-hidden="true">{initials}</div>
          </div>
        </div>
      </header>

      {/* ── MOBILE TOPBAR ── */}
      <div className="mobile-topbar">
        <span className="mob-brand">WorkSpace</span>
        <div className="mob-right">
          <button className="notif-btn" aria-label={`การแจ้งเตือน ${notifCount} รายการ`}>
            <i className="ti ti-bell" aria-hidden="true"></i>
            {notifCount > 0 && <span className="badge">{notifCount}</span>}
          </button>
          <div
            className="avatar-circle"
            style={{ width: 32, height: 32, fontSize: 11, borderRadius: 9 }}
            aria-hidden="true"
          >
            {initials}
          </div>
        </div>
      </div>
    </>
  );
}