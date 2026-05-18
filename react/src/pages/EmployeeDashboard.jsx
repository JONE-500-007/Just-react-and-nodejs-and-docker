// ============================================================
//  EmployeeDashboard.jsx  —  Root component
//
//  File structure (src/):
//    components/
//      Topbar.jsx        — desktop + mobile header
//      Sidebar.jsx       — desktop left nav
//      BottomNav.jsx     — mobile bottom nav
//      CheckinCard.jsx   — attendance status card
//      TaskItem.jsx      — individual task row
//    hooks/
//      useDashboard.js   — state + business logic
//    styles/
//      dashboard.css     — all styling (BEM-style classes)
//
//  Required CDN (index.html):
//    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
//    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
// ============================================================

import React, { useMemo } from 'react';

import Topbar      from "../components/Topbar";
import Sidebar     from "../components/Sidebar";
import BottomNav   from "../components/BottomNav";
import CheckinCard from "../components/CheckinCard";
import TaskItem    from "../components/TaskItem";

import { useDashboard, NAV_ITEMS } from "../hooks/useDashboard";
import { useAuth } from '../context/AuthContext';

import "../styles/dashboard.css";

// ── Sub-components (inline, small enough not to need own files) ──

function StatCard({ label, value, iconName, iconColor, iconBg, subText, subColor }) {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrap" style={{ background: iconBg }}>
        <i className={`ti ti-${iconName}`} style={{ color: iconColor }} aria-hidden="true"></i>
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color: value.color }}>{value.number}</div>
      <div className="stat-sub" style={{ color: subColor }}>{subText}</div>
    </div>
  );
}

function MemberItem({ member }) {
  return (
    <div className="member-item">
      <div className="member-av">
        {member.initial}
        <div className={`member-dot ${member.online ? '' : 'offline'}`} aria-hidden="true"></div>
      </div>
      <div>
        <div className="member-name">{member.name}</div>
        <div className="member-role">{member.role}</div>
      </div>
      <div
        className="member-status"
        style={{ color: member.online ? 'var(--green)' : 'var(--muted)' }}
      >
        {member.online ? 'ออนไลน์' : 'ออฟไลน์'}
      </div>
    </div>
  );
}

// ── Helpers ──────────────────────────────────────────────────

function formatThaiDate() {
  return new Date().toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ── Main component ────────────────────────────────────────────

export default function EmployeeDashboard() {
  const { logout } = useAuth(); 
  const {
    tasks, team,
    activeTab, setActiveTab,
    isCheckedIn, toggleCheckIn,
    toggleTask, stats,
  } = useDashboard();

  const thaiDate = useMemo(formatThaiDate, []);

  const statCards = [
    {
      label: 'งานทั้งหมด',
      value: { number: stats.total, color: '#fff' },
      iconName: 'list-check', iconColor: 'var(--blue)', iconBg: 'var(--blue-dim)',
      subText: 'สัปดาห์นี้', subColor: 'var(--muted)',
    },
    {
      label: 'เสร็จแล้ว',
      value: { number: stats.done, color: 'var(--green)' },
      iconName: 'circle-check', iconColor: 'var(--green)', iconBg: 'var(--green-dim)',
      subText: `+${stats.done} วันนี้`, subColor: 'var(--green)',
    },
    {
      label: 'เกินกำหนด',
      value: { number: stats.overdue, color: 'var(--amber)' },
      iconName: 'clock-exclamation', iconColor: 'var(--amber)', iconBg: 'var(--amber-dim)',
      subText: 'ต้องรีบจัดการ', subColor: 'var(--red)',
    },
  ];

  return (
    <div className="shell">
      {/* Sidebar — desktop */}
      <Sidebar navItems={NAV_ITEMS} activeTab={activeTab} onSelect={setActiveTab} onLogout={logout} />

      {/* Main */}
      <main className="main">
        {/* Topbars */}
        <Topbar
          name="อรพรรณ พาหุรัตน์"
          role="UX/UI Designer"
          notifCount={2}
        />

        {/* Scrollable body */}
        <div className="content">

          {/* Welcome */}
          <div className="welcome-row">
            <div>
              <div className="welcome-title">สวัสดีตอนเช้า, อรพรรณ 👋</div>
              <div className="welcome-sub">"ขอให้วันนี้เป็นวันที่ดีและสนุกกับการทำงาน"</div>
            </div>
            <div className="date-text">
              <div>{thaiDate}</div>
            </div>
          </div>

          {/* Check-in */}
          <CheckinCard
            isCheckedIn={isCheckedIn}
            onToggle={toggleCheckIn}
            checkInTime="08:47"
            hoursWorked="7 ชั่วโมง 13 นาที"
          />

          {/* Stats */}
          <div className="stat-grid">
            {statCards.map(s => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* 2-column layout */}
          <div className="two-col">

            {/* Left: Task list */}
            <div className="panel">
              <div className="panel-header">
                <div className="panel-title-wrap">
                  <div className="panel-icon" style={{ background: 'var(--blue-dim)' }}>
                    <i className="ti ti-clipboard-list" style={{ color: 'var(--blue)' }} aria-hidden="true"></i>
                  </div>
                  <div className="panel-title">งานที่ได้รับมอบหมาย</div>
                </div>
                <button className="panel-action">ดูทั้งหมด</button>
              </div>

              {tasks.map(task => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} />
              ))}
            </div>

            {/* Right: Team + Alert */}
            <div className="side-stack">

              {/* Team */}
              <div className="panel">
                <div className="panel-header">
                  <div className="panel-title-wrap">
                    <div className="panel-icon" style={{ background: 'rgba(129,140,248,0.12)' }}>
                      <i className="ti ti-users" style={{ color: 'var(--indigo)' }} aria-hidden="true"></i>
                    </div>
                    <div className="panel-title">เพื่อนร่วมทีม</div>
                  </div>
                </div>
                {team.map(member => (
                  <MemberItem key={member.id} member={member} />
                ))}
              </div>

              {/* Alert */}
              <div className="alert-card">
                <i className="ti ti-alert-circle alert-bg" aria-hidden="true"></i>
                <div className="alert-badge">
                  <i className="ti ti-alert-triangle" aria-hidden="true"></i>
                  <span>แจ้งเตือนสำคัญ</span>
                </div>
                <div className="alert-text">
                  งาน <strong>Unit Test</strong> เกินกำหนดแล้ว กรุณาอัปเดตความคืบหน้าให้หัวหน้าทีมทราบภายในวันนี้
                </div>
                <button className="alert-btn">รับทราบและอัปเดตงาน</button>
              </div>

            </div>
          </div>
        </div>{/* end .content */}
      </main>

      {/* Bottom nav — mobile */}
      <BottomNav navItems={NAV_ITEMS} activeTab={activeTab} onSelect={setActiveTab} onLogout={logout} />
    </div>
  );
}