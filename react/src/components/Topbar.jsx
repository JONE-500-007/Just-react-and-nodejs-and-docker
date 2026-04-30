import React from 'react';

export default function Topbar({ name = "User", role = "Employee" }) {
  const today = new Date().toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">สวัสดี, {name}</div>
        <div className="topbar-sub">{today}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span className="badge-emp">{role}</span>
        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
        <div className="av">
          {name.substring(0, 2)}
        </div>
      </div>
    </div>
  );
}