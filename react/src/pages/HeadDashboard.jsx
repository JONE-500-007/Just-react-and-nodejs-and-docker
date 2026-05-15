// ============================================================
//  HeadDashboard.jsx  —  Root component (Manager / Head view)
//
//  File structure (src/):
//    components/
//      Topbar.jsx              — shared with Employee (not used here)
//      Sidebar.jsx             — shared base (optional reuse)
//      BottomNav.jsx           — shared with Employee (not used here)
//      TeamRow.jsx             ← Head-specific: team member row
//      ProjectHealthCard.jsx   ← Head-specific: SVG circle chart
//    hooks/
//      useHeadDashboard.js     ← Head state + logic
//    styles/
//      head-dashboard.css      ← Head styles
//
//  Required CDN (index.html):
//    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
//    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
// ============================================================

import React from 'react';
import { useHeadDashboard, HEAD_NAV_ITEMS, HEAD_BOTTOM_NAV } from '../hooks/useHeadDashboard';
import TeamRow           from '../components/TeamRow';
import ProjectHealthCard from '../components/ProjectHealthCard';
import '../styles/head-dashboard.css';

// ── Icon map for activity log ─────────────────────────────────
const ACTIVITY_ICON = {
  upload:  { icon: 'file-upload',   bg: 'var(--green-dim)',  color: 'var(--green)' },
  warning: { icon: 'alert-triangle', bg: 'var(--amber-dim)', color: 'var(--amber)' },
  done:    { icon: 'circle-check',  bg: 'var(--blue-dim)',   color: 'var(--blue)'  },
};

// ── Sub-components (small enough to stay inline) ──────────────

function MetricCard({ label, value, valueSuffix, iconName, iconBg, iconColor, trend, trendClass }) {
  return (
    <div className="h-metric-card">
      <div className="h-metric-icon" style={{ background: iconBg }}>
        <i className={`ti ti-${iconName}`} style={{ color: iconColor }} aria-hidden="true"></i>
      </div>
      <div>
        <div className="h-m-label">{label}</div>
        <div className="h-m-value">
          {value}
          {valueSuffix && (
            <span style={{ fontSize: 14, color: 'var(--muted)' }}>{valueSuffix}</span>
          )}
        </div>
        {trend && <div className={`h-m-trend ${trendClass}`}>{trend}</div>}
      </div>
    </div>
  );
}

function ActivityLog({ activity }) {
  return (
    <div className="h-panel">
      <div className="h-panel-header">
        <div className="h-panel-title-wrap">
          <div className="h-panel-icon" style={{ background: 'var(--green-dim)' }}>
            <i className="ti ti-activity" style={{ color: 'var(--green)' }} aria-hidden="true"></i>
          </div>
          <div className="h-panel-title">กิจกรรมล่าสุด</div>
        </div>
      </div>
      <div className="h-log-list">
        {activity.map(log => {
          const { icon, bg, color } = ACTIVITY_ICON[log.type] ?? ACTIVITY_ICON.done;
          return (
            <div className="h-log-item" key={log.id}>
              <div className="h-log-icon" style={{ background: bg }}>
                <i className={`ti ti-${icon}`} style={{ color }} aria-hidden="true"></i>
              </div>
              <div>
                <div className="h-log-text">
                  <b>{log.actor}</b> {log.message} <em>{log.highlight}</em>
                </div>
                <div className="h-log-time">{log.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Root component ────────────────────────────────────────────

export default function HeadDashboard() {
  const {
    team, activity, metrics,
    activeTab, setActiveTab,
    progressColor,
  } = useHeadDashboard();

  const metricCards = [
    {
      label: 'งานที่เสร็จแล้ว',
      value: metrics.done,
      valueSuffix: `/${metrics.total}`,
      iconName: 'circle-check',
      iconBg: 'var(--green-dim)',
      iconColor: 'var(--green)',
      trend: '+12% จากสัปดาห์ก่อน',
      trendClass: 'trend-up',
    },
    {
      label: 'กำลังดำเนินการ',
      value: metrics.inProg,
      iconName: 'loader',
      iconBg: 'var(--blue-dim)',
      iconColor: 'var(--blue)',
      trend: `ตามแผนงาน ${metrics.health}%`,
      trendClass: 'trend-warn',
    },
    {
      label: 'งานเกินกำหนด',
      value: metrics.overdue,
      iconName: 'clock-exclamation',
      iconBg: 'var(--red-dim)',
      iconColor: 'var(--red)',
      trend: 'ต้องรีบจัดการ',
      trendClass: 'trend-down',
    },
  ];

  return (
    <div className="h-shell">

      {/* ── SIDEBAR (desktop) ── */}
      <aside className="h-sidebar">
        <div className="h-brand">
          <div className="h-brand-name">WorkSpace</div>
          <span className="h-brand-tag">Management</span>
        </div>

        <div className="h-nav-section">
          <div className="h-nav-label">การจัดการ</div>
          {HEAD_NAV_ITEMS.map(item => (
            <button
              key={item.name}
              className={`h-nav-btn ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
              aria-current={activeTab === item.name ? 'page' : undefined}
            >
              <i className={`ti ti-${item.icon}`} aria-hidden="true"></i>
              {item.name}
            </button>
          ))}
        </div>

        <div className="h-nav-footer">
          <div className="h-profile-mini">
            <div className="h-av">JD</div>
            <div>
              <div className="h-pname">John Doe</div>
              <div className="h-prole">Project Manager</div>
            </div>
          </div>
          <button className="h-logout" onClick={() => console.log('logout')}>
            <i className="ti ti-logout" aria-hidden="true"></i>
            ออกจากระบบ
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="h-main">

        {/* Mobile topbar */}
        <div className="h-mob-topbar">
          <span className="h-mob-brand">WorkSpace</span>
          <div className="h-mob-right">
            <button className="h-notif-btn" aria-label="การแจ้งเตือน 3 รายการ">
              <i className="ti ti-bell" aria-hidden="true"></i>
              <span className="h-badge">3</span>
            </button>
            <div className="h-av" style={{ width: 32, height: 32, fontSize: 10, borderRadius: 8 }}>JD</div>
          </div>
        </div>

        {/* Desktop topbar */}
        <header className="h-topbar">
          <div>
            <div className="h-page-title">แดชบอร์ดผู้บริหาร</div>
            <div className="h-page-sub">ยินดีต้อนรับกลับมา — สรุปความคืบหน้าของทีมวันนี้</div>
          </div>
          <div className="h-topbar-right">
            <div className="h-search-wrap">
              <i className="ti ti-search" aria-hidden="true"></i>
              <input
                className="h-search-input"
                type="text"
                placeholder="ค้นหางานหรือสมาชิก..."
                aria-label="ค้นหา"
              />
            </div>
            <button className="h-btn-new">
              <i className="ti ti-plus" aria-hidden="true"></i>
              สร้างโปรเจกต์
            </button>
            <button className="h-notif-btn" aria-label="การแจ้งเตือน 3 รายการ">
              <i className="ti ti-bell" aria-hidden="true"></i>
              <span className="h-badge">3</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="h-content">

          {/* Metrics */}
          <div className="h-metrics">
            {metricCards.map(m => <MetricCard key={m.label} {...m} />)}
          </div>

          {/* 2-col grid */}
          <div className="h-grid">

            {/* Left: Team progress */}
            <div className="h-panel">
              <div className="h-panel-header">
                <div className="h-panel-title-wrap">
                  <div className="h-panel-icon" style={{ background: 'var(--indigo-dim)' }}>
                    <i className="ti ti-users" style={{ color: 'var(--indigo)' }} aria-hidden="true"></i>
                  </div>
                  <div className="h-panel-title">ความคืบหน้าของทีม</div>
                </div>
                <button className="h-panel-action">ดูทั้งหมด</button>
              </div>

              <div role="list">
                {team.map(member => (
                  <TeamRow
                    key={member.id}
                    member={member}
                    progressColor={progressColor}
                  />
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="h-side-col">
              <ProjectHealthCard
                pct={metrics.health}
                onPlan={metrics.onPlan}
                delayed={metrics.delayed}
              />
              <ActivityLog activity={activity} />
            </div>

          </div>
        </div>
      </main>

      {/* ── BOTTOM NAV (mobile) ── */}
      <nav className="h-bottom-nav" aria-label="เมนูหลัก">
        <div className="h-bnav-inner">
          {HEAD_BOTTOM_NAV.map(item => (
            <button
              key={item.name}
              className={`h-bnav-btn ${activeTab === item.name ? 'active' : ''}`}
              onClick={() => setActiveTab(item.name)}
              aria-current={activeTab === item.name ? 'page' : undefined}
            >
              <i className={`ti ti-${item.icon}`} aria-hidden="true"></i>
              {item.name}
            </button>
          ))}
        </div>
      </nav>

    </div>
  );
}