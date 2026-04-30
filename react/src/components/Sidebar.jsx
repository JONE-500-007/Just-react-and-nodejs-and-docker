import React from 'react';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="brand">
        <div className="brand-name">WorkSpace</div>
        <div className="brand-role">Management Portal</div>
      </div>

      <div className="nav-section">
        <div className="nav-label">เมนูหลัก</div>

        <div className="nav-item active">
          <div className="nav-dot blue"></div>
          หน้าหลัก
        </div>

        <div className="nav-item">
          <div className="nav-dot green"></div>
          งานของฉัน
        </div>

        <div className="nav-item">
          <div className="nav-dot amber"></div>
          ตารางงาน
        </div>

        <div className="nav-item">
          <div className="nav-dot purple"></div>
          ทีมของฉัน
        </div>
      </div>
      
      <div className="nav-section" style={{marginTop: 'auto'}}>
        <div className="nav-label">บัญชี</div>
        <div className="nav-item">โปรไฟล์</div>
        <div className="nav-item">ออกจากระบบ</div>
      </div>
    </div>
  );
}