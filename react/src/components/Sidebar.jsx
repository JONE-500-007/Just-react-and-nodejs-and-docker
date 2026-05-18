// ============================================================
//  Sidebar.jsx
//  Desktop sidebar — hidden on mobile (see dashboard.css).
//  A <BottomNav> component handles mobile navigation instead.
//
//  Props:
//    navItems   { name: string, icon: string }[]  — nav entries
//    activeTab  string                            — current active page
//    onSelect   (name: string) => void            — tab change handler
// ============================================================

import React from 'react';

export default function Sidebar({ navItems = [], activeTab, onSelect, onLogout }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="brand">
        <div className="brand-name">WorkSpace</div>
        <span className="brand-tag">Employee Portal</span>
      </div>

      {/* Primary navigation */}
      <div className="nav-section">
        <div className="nav-label">เมนูหลัก</div>
        {navItems.map(item => (
          <button
            key={item.name}
            className={`nav-btn ${activeTab === item.name ? 'active' : ''}`}
            onClick={() => onSelect(item.name)}
            aria-current={activeTab === item.name ? 'page' : undefined}
          >
            <i className={`ti ti-${item.icon}`} aria-hidden="true"></i>
            {item.name}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="nav-footer">
        <button className="logout-btn" onClick={onLogout}>
          <i className="ti ti-logout" aria-hidden="true"></i>
          ออกจากระบบ
        </button>
      </div>
    </aside>
    
  );
}