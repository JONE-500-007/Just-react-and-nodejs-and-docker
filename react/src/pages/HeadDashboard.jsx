import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  Search,
  ChevronRight
} from 'lucide-react';

export default function HeadDashboard() {
  const [activeTab, setActiveTab] = useState('ภาพรวม');

  // ข้อมูลจำลองสำหรับสถานะทีม
  const teamStatus = [
    { id: 1, name: "สวิตต์ วานิช", role: "UI Designer", status: "online", progress: 85, task: "ออกแบบ Dashboard" },
    { id: 2, name: "อรพรรณ ใจดี", role: "Frontend Developer", status: "online", progress: 40, task: "เขียน API Integration" },
    { id: 3, name: "ธนพล มั่นคง", role: "Backend Developer", status: "away", progress: 10, task: "Setup Database" },
    { id: 4, name: "จิราพร สมบัติ", role: "QA Engineer", status: "offline", progress: 100, task: "Testing Auth Flow" },
  ];

  return (
    <div className="head-shell">
      {/* สไตล์ที่รวมเข้ามาเพื่อให้รันในไฟล์เดียวได้ */}
      <style>{`
        :root {
          --bg-head: #0B0E14;
          --bg-side: #121620;
          --bg-card: #161B26;
          --accent: #6366F1;
          --text-main: #F8FAFC;
          --text-dim: #94A3B8;
        }

        .head-shell {
          display: flex;
          height: 100vh;
          background: var(--bg-head);
          color: var(--text-main);
          font-family: 'Inter', sans-serif;
        }

        /* SIDEBAR */
        .head-sidebar {
          width: 280px;
          background: var(--bg-side);
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
          padding: 32px 24px;
        }

        .head-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }

        .logo-box {
          width: 40px;
          height: 40px;
          background: var(--accent);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 20px;
        }

        .brand-name {
          font-weight: 800;
          font-size: 18px;
          letter-spacing: -0.02em;
        }

        .brand-tag {
          font-size: 10px;
          color: var(--text-dim);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .nav-group-label {
          font-size: 11px;
          font-weight: 800;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
          padding-left: 12px;
        }

        .head-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          color: var(--text-dim);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: 0.2s;
        }

        .head-nav-item:hover {
          background: rgba(255,255,255,0.03);
          color: white;
        }

        .head-nav-item.active {
          background: var(--accent);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .head-profile-summary {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .av-head {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366F1, #A855F7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        }

        .head-name { font-weight: 700; font-size: 14px; }
        .head-rank { font-size: 11px; color: var(--text-dim); }

        /* MAIN CONTENT */
        .head-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .head-topbar {
          height: 100px;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .page-title { font-size: 24px; font-weight: 800; }
        .page-subtitle { color: var(--text-dim); font-size: 14px; }

        .head-actions { display: flex; gap: 16px; }

        .search-bar {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 0 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 250px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: white;
          font-size: 13px;
          width: 100%;
          outline: none;
        }

        .btn-primary {
          background: white;
          color: black;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 14px;
          border: none;
          cursor: pointer;
        }

        .head-content {
          padding: 40px;
          overflow-y: auto;
          flex: 1;
        }

        .head-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .h-metric-card {
          background: var(--bg-card);
          padding: 24px;
          border-radius: 24px;
          display: flex;
          gap: 20px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .h-metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .h-metric-icon.blue { background: rgba(99, 102, 241, 0.1); color: #6366F1; }
        .h-metric-icon.amber { background: rgba(245, 158, 11, 0.1); color: #F59E0B; }
        .h-metric-icon.rose { background: rgba(244, 63, 94, 0.1); color: #F43F5E; }

        .h-label { font-size: 12px; color: var(--text-dim); font-weight: 700; margin-bottom: 4px; }
        .h-value { font-size: 24px; font-weight: 800; }
        .h-trend { font-size: 11px; font-weight: 600; margin-top: 4px; }
        .h-trend.up { color: #10B981; }
        .h-trend.down { color: #F43F5E; }

        .head-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 24px;
        }

        .h-card {
          background: var(--bg-card);
          border-radius: 24px;
          padding: 32px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .card-title { font-size: 18px; font-weight: 800; }
        .text-btn { background: transparent; border: none; color: var(--accent); font-weight: 700; font-size: 13px; cursor: pointer; }

        .team-list { display: flex; flex-direction: column; gap: 16px; }

        .team-member-row {
          display: grid;
          grid-template-columns: 240px 1fr 40px;
          align-items: center;
          padding: 16px;
          background: rgba(255,255,255,0.02);
          border-radius: 16px;
          transition: 0.2s;
        }

        .team-member-row:hover { background: rgba(255,255,255,0.04); }

        .member-main { display: flex; gap: 12px; align-items: center; }
        .member-av {
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 14px;
        }

        .status-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 2px solid var(--bg-card);
        }

        .status-dot.online { background: #10B981; }
        .status-dot.away { background: #F59E0B; }
        .status-dot.offline { background: #64748B; }

        .m-name { font-weight: 700; font-size: 14px; }
        .m-role { font-size: 11px; color: var(--text-dim); }

        .m-current-task { font-size: 12px; font-weight: 600; margin-bottom: 6px; }

        .progress-container { display: flex; align-items: center; gap: 12px; }
        .progress-bar-bg { flex: 1; height: 6px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; }
        .progress-bar-fill { height: 100%; background: var(--accent); border-radius: 10px; }
        .progress-text { font-size: 11px; font-weight: 800; color: var(--text-dim); width: 30px; }

        .icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: var(--text-dim);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .h-side-col { display: flex; flex-direction: column; gap: 24px; }

        .health-chart-mock {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 0;
        }

        .circle-progress {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 12px solid rgba(99, 102, 241, 0.1);
          border-top-color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .percentage { font-size: 24px; font-weight: 900; }

        .health-stats { display: flex; gap: 20px; }
        .h-stat { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: var(--text-dim); }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.blue { background: var(--accent); }
        .dot.rose { background: #F43F5E; }

        .log-list { display: flex; flex-direction: column; gap: 20px; }
        .log-item { position: relative; padding-left: 24px; }
        .log-dot { position: absolute; left: 0; top: 6px; width: 8px; height: 8px; border-radius: 50%; background: #10B981; }
        .log-dot.warning { background: #F59E0B; }
        .log-item p { font-size: 13px; line-height: 1.4; color: var(--text-dim); }
        .log-item b { color: white; }
        .log-item span { color: var(--accent); }
        .log-time { display: block; font-size: 11px; margin-top: 4px; color: #475569; }

        @media (max-width: 1200px) {
          .head-grid { grid-template-columns: 1fr; }
          .head-metrics { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* SIDEBAR สำหรับหัวหน้า */}
      <aside className="head-sidebar">
        <div className="head-brand">
          <div className="logo-box">H</div>
          <div>
            <div className="brand-name">WorkSpace</div>
            <div className="brand-tag">Management</div>
          </div>
        </div>

        <nav className="head-nav">
          <p className="nav-group-label">การจัดการ</p>
          <div className={`head-nav-item ${activeTab === 'ภาพรวม' ? 'active' : ''}`} onClick={() => setActiveTab('ภาพรวม')}>
            <BarChart3 size={18} /> ภาพรวมทีม
          </div>
          <div className={`head-nav-item ${activeTab === 'งานทีม' ? 'active' : ''}`} onClick={() => setActiveTab('งานทีม')}>
            <Users size={18} /> สมาชิกและภาระงาน
          </div>
          <div className="head-nav-item">
            <TrendingUp size={18} /> ผลการทำงาน
          </div>
          <div className="head-nav-item">
            <Calendar size={18} /> แผนงานโครงการ
          </div>
        </nav>

        <div className="head-profile-summary">
          <div className="av-head">JD</div>
          <div className="head-info">
            <p className="head-name">John Doe</p>
            <p className="head-rank">Project Manager</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="head-main">
        <header className="head-topbar">
          <div>
            <h1 className="page-title">แดชบอร์ดผู้บริหาร</h1>
            <p className="page-subtitle">ยินดีต้อนรับกลับมา, นี่คือสรุปความคืบหน้าของทีมวันนี้</p>
          </div>
          <div className="head-actions">
            <div className="search-bar">
              <Search size={16} />
              <input type="text" placeholder="ค้นหางานหรือคน..." />
            </div>
            <button className="btn-primary">สร้างโปรเจกต์ใหม่</button>
          </div>
        </header>

        <div className="head-content">
          {/* TOP METRICS */}
          <div className="head-metrics">
            <div className="h-metric-card">
              <div className="h-metric-icon blue"><CheckCircle2 /></div>
              <div className="h-metric-data">
                <p className="h-label">งานที่เสร็จแล้ว</p>
                <p className="h-value">24/32</p>
                <p className="h-trend up">+12% จากสัปดาห์ก่อน</p>
              </div>
            </div>
            <div className="h-metric-card">
              <div className="h-metric-icon amber"><Clock /></div>
              <div className="h-metric-data">
                <p className="h-label">งานกำลังดำเนินการ</p>
                <p className="h-value">12</p>
                <p className="h-trend">ตามแผนงาน 85%</p>
              </div>
            </div>
            <div className="h-metric-card">
              <div className="h-metric-icon rose"><AlertTriangle /></div>
              <div className="h-metric-data">
                <p className="h-label">งานเกินกำหนด</p>
                <p className="h-value">3</p>
                <p className="h-trend down">ต้องรีบจัดการ</p>
              </div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div className="head-grid">
            {/* LEFT: TEAM TRACKING */}
            <section className="h-card team-track">
              <div className="card-header">
                <h2 className="card-title">ความคืบหน้าของทีม</h2>
                <button className="text-btn">ดูทั้งหมด</button>
              </div>
              <div className="team-list">
                {teamStatus.map(member => (
                  <div key={member.id} className="team-member-row">
                    <div className="member-main">
                      <div className="relative" style={{ position: 'relative' }}>
                        <div className="member-av">{member.name.substring(0, 1)}</div>
                        <div className={`status-dot ${member.status}`}></div>
                      </div>
                      <div className="member-meta">
                        <p className="m-name">{member.name}</p>
                        <p className="m-role">{member.role}</p>
                      </div>
                    </div>
                    <div className="member-task-info">
                      <p className="m-current-task">{member.task}</p>
                      <div className="progress-container">
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${member.progress}%` }}></div>
                        </div>
                        <span className="progress-text">{member.progress}%</span>
                      </div>
                    </div>
                    <button className="icon-btn"><ChevronRight size={18} /></button>
                  </div>
                ))}
              </div>
            </section>

            {/* RIGHT: SIDE COLUMN */}
            <div className="h-side-col">
              <section className="h-card health-card">
                <h2 className="card-title">สุขภาพโครงการ</h2>
                <div className="health-chart-mock">
                  <div className="circle-progress">
                    <span className="percentage">78%</span>
                  </div>
                  <div className="health-stats">
                    <div className="h-stat">
                      <span className="dot blue"></span>
                      <span>ในแผนงาน: 18</span>
                    </div>
                    <div className="h-stat">
                      <span className="dot rose"></span>
                      <span>ล่าช้า: 2</span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="h-card log-card">
                <h2 className="card-title">กิจกรรมล่าสุด</h2>
                <div className="log-list">
                  <div className="log-item">
                    <div className="log-dot"></div>
                    <p><b>สวิตต์</b> อัปเดตไฟล์ <span>Design-v2.fig</span></p>
                    <span className="log-time">10 นาทีที่แล้ว</span>
                  </div>
                  <div className="log-item">
                    <div className="log-dot warning"></div>
                    <p><b>ระบบ</b> ตรวจพบงานเกินกำหนด 2 รายการ</p>
                    <span className="log-time">1 ชม. ที่แล้ว</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}