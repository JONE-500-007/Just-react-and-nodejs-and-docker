// ============================================================
//  BottomNav.jsx
//  Fixed bottom navigation bar — visible on mobile only.
//  Displays on screens ≤768px (controlled by dashboard.css).
//
//  Props:
//    navItems   { name: string, icon: string }[]  — nav entries
//    activeTab  string                            — current active page
//    onSelect   (name: string) => void            — tab change handler
// ============================================================

import React from 'react';

export default function BottomNav({ navItems = [], activeTab, onSelect, onLogout }) {
  return (
    <nav className="bottom-nav" aria-label="เมนูหลัก">
      <div className="bottom-nav-inner">
        {navItems.map(item => (
          <button
            key={item.name}
            className={`bnav-btn ${activeTab === item.name ? 'active' : ''}`}
            onClick={() => onSelect(item.name)}
            aria-current={activeTab === item.name ? 'page' : undefined}
          >
            <i className={`ti ti-${item.icon}`} aria-hidden="true"></i>
            {/* Shorten long labels for mobile */}
            {item.name === 'ตารางงาน' ? 'ตาราง' : item.name}
          </button>
        ))}
        <button className="bnav-btn" onClick={onLogout}>
          <i className="ti ti-logout" aria-hidden="true"></i>
          ออกจากระบบ
        </button>
      </div>
    </nav>
  );
}