// ============================================================
//  TeamRow.jsx
//  One team member row inside the "ความคืบหน้าของทีม" panel.
//  Shows avatar, status dot, role, current task, progress bar.
//
//  Props:
//    member          { id, name, initial, role, status, progress, task }
//    progressColor   (pct: number) => string   — returns CSS color
// ============================================================

import React from 'react';

export default function TeamRow({ member, progressColor }) {
  return (
    <div className="h-team-row" role="listitem">
      {/* Avatar + status dot */}
      <div className="h-member-av" aria-label={`${member.name} — ${member.status}`}>
        {member.initial}
        <div className={`h-status-dot ${member.status}`} aria-hidden="true"></div>
      </div>

      {/* Name + role */}
      <div style={{ minWidth: 110 }}>
        <div className="h-m-name">{member.name}</div>
        <div className="h-m-role">{member.role}</div>
      </div>

      {/* Task name + progress */}
      <div className="h-task-info">
        <div className="h-task-name" title={member.task}>{member.task}</div>
        <div className="h-prog-wrap">
          <div className="h-prog-bg" role="progressbar" aria-valuenow={member.progress} aria-valuemin={0} aria-valuemax={100}>
            <div
              className="h-prog-fill"
              style={{
                width: `${member.progress}%`,
                background: progressColor(member.progress),
              }}
            ></div>
          </div>
          <span className="h-prog-pct">{member.progress}%</span>
        </div>
      </div>

      {/* Detail button */}
      <button className="h-row-btn" aria-label={`ดูรายละเอียด ${member.name}`}>
        <i className="ti ti-chevron-right" aria-hidden="true"></i>
      </button>
    </div>
  );
}